import type {FrameMap, Frames, FrameTime, Point} from "../types";
import {FighterDirection, PUSH_FRICTION, STAGE_WIDTH, States, ViewportGame} from "../constants";
import {State} from "../state";
import {BackState, JumpState, HeadHitState, BodyHitState, HeadHurtState, BodyHurtState, JumpHurtState} from "../states";
import {Controller} from "../controller";
import {asFrameMap} from "../helper";
import {getRealBoxDimensions, hasOverlap} from "../utils/collision";
import {Camera} from "../camera";

export abstract class Fighter {
    public style;
    public frames: Frames;
    public currentFrame: number;
    public animationTimer: number;
    public states: Map<string, State>;
    protected state: State;
    public velocity: Point;
    public name: string;
    public health: number;
    public enemy: Fighter;
    public pushBox: FrameMap;
    public hurtBox: [FrameMap, FrameMap,FrameMap];
    public hitBox: FrameMap;
    constructor(public position: Point,
                public direction: FighterDirection,
                public controller: Controller) {
        this.position = position;
        this.direction = direction;
        this.frames = new Map();
        this.velocity = {x: 50, y: 0};
        this.style = new Image();
        this.animationTimer = 0;
        this.states = new Map<string, State>();
        this.state = new BackState();
        this.name = '';
        this.health = 100;
        this.pushBox = asFrameMap(this.state.pushBox);
        this.hurtBox = [
            asFrameMap(this.state.hurtBox[0]),
            asFrameMap(this.state.hurtBox[1]),
            asFrameMap(this.state.hurtBox[2])
        ];
        this.hitBox = asFrameMap(this.state.hitBox);
    }

    public DEFAULT: {
        DIRECTION: FighterDirection,
        VELOCITY: {X: any, Y: any}
    };

    getStateName(): `${States}` {
        return this.state.name;
    }

    setOppositeDirection() {
        if (
            this.position.x + this.pushBox.x >=
            this.enemy.position.x + this.enemy.pushBox.x + this.enemy.pushBox.width
        ) {
            this.direction = FighterDirection.LEFT;
        } else if (this.position.x + this.pushBox.x + this.pushBox.width <= this.enemy.position.x + this.enemy.pushBox.x) {
            this.direction = FighterDirection.RIGHT;
        }
    }

    setState(newState: State, ...args: unknown[]) {
        this.state = newState;
        this.state.setFighter(this, args);
        this.currentFrame = 0;
    }

    private isFacedEnemy() {
        const fighterFrameMap = {
            x: this.position.x + this.pushBox.x,
            y: this.position.y + this.pushBox.y,
            width: this.pushBox.width,
            height: this.pushBox.height,
        };
        const enemyFrameMap = {
            x: this.enemy.position.x + this.enemy.pushBox.x,
            y: this.enemy.position.y + this.enemy.pushBox.y,
            width: this.enemy.pushBox.width,
            height: this.enemy.pushBox.height,
        };
        return hasOverlap(fighterFrameMap, enemyFrameMap);
    }

    private stageBordersUpdate(time: FrameTime, camera: Camera) {
        if (this.position.x >= camera.position.x + ViewportGame.WIDTH - this.pushBox.width) {
            this.position.x = camera.position.x + ViewportGame.WIDTH - this.pushBox.width;
        } else if (this.position.x < this.pushBox.width) {
            this.position.x = camera.position.x + this.pushBox.width;
        }

        if (this.isFacedEnemy()) {
            if (this.position.x <= this.enemy.position.x) {
                this.position.x = Math.max(
                    this.enemy.position.x + this.enemy.pushBox.x - (this.pushBox.x + this.pushBox.width),
                    this.pushBox.width,
                );

                if (([States.STAND, States.JUMP, States.SIT, States.JUMP_FORWARD, States.JUMP_BACK] as string[])
                    .includes(this.enemy.getStateName())) {
                    this.enemy.position.x += PUSH_FRICTION * time.secondsPassed;
                }
            }

            if (this.position.x >= this.enemy.position.x) {
                this.position.x = Math.min(
                    this.enemy.position.x + this.enemy.pushBox.x + this.enemy.pushBox.width + (this.pushBox.x + this.pushBox.width),
                    ViewportGame.WIDTH - this.pushBox.width
                );

                if (([States.STAND, States.JUMP, States.SIT, States.JUMP_FORWARD, States.JUMP_BACK] as string[])
                    .includes(this.enemy.getStateName())) {
                    this.enemy.position.x -= PUSH_FRICTION * time.secondsPassed;
                }
            }
        }
    }

    private attackBoxCollisionUpdate(time: FrameTime) {
        if (!(this.state instanceof HeadHitState || this.state instanceof BodyHitState)) return;
        if ((
            this.enemy.state instanceof HeadHurtState ||
            this.enemy.state instanceof BodyHurtState ||
            this.enemy.state instanceof JumpHurtState)) return;

        const realHitBox = getRealBoxDimensions(this.position, this.direction, this.hitBox);

        for (const [index, box] of this.enemy.hurtBox.entries()) {
            const realEnemyHurtBox = getRealBoxDimensions(this.enemy.position, this.enemy.direction, box);
            const hurtName = ['head', 'body', 'legs'];
            if (hasOverlap(realHitBox, realEnemyHurtBox)) {
                console.log(`${this.name} hits ${this.enemy.name} to ${hurtName[index]}`);

                this.enemy.position.x -= 20 * this.enemy.direction;

                let hurtState = null;
                if (this.enemy.state instanceof JumpState) {
                    hurtState = this.enemy.states.get(States.JUMP_HURT);
                } else {
                    switch (hurtName[index]) {
                        case 'head':
                            hurtState = this.enemy.states.get(States.HEAD_HURT);
                            break;
                        case 'body':
                            hurtState = this.enemy.states.get(States.BODY_HURT);
                            break;
                        case 'legs':
                            break;
                    }
                }

                if (hurtState) {
                    this.enemy.setState(hurtState);
                }
                return;
            }
        }
    }

    getWinnerAndLoser() {
        return [this, this.enemy].sort((a, b) => a.health > b.health ? -1 : 1) as [Fighter, Fighter];
    }

    setWinnerAndLoserStates() {
        const [winner, loser] = this.getWinnerAndLoser();
        winner.setState(winner.states.get(States.WIN));
        loser.setState(loser.states.get(States.LOSE));
    }

    runDefaultAnimation(time: FrameTime) {
        const [, framesCount, framesDelay] = this.frames.get(this.state.name);
        let animationDelay: number;

        if (framesDelay instanceof Array) {
            animationDelay = framesDelay[this.currentFrame];
        } else {
            animationDelay = framesDelay;
        }

        if (time.previous > this.animationTimer + animationDelay) {
            this.animationTimer = time.previous;
            this.currentFrame++;
            if (this.currentFrame >= framesCount) {
                this.currentFrame = 0;
            }
        }
    }

    runSinglePassAnimation(time: FrameTime, nextState?: States) {
        const [, framesCount, framesDelay] = this.frames.get(this.state.name);
        let animationDelay: number;

        if (framesDelay instanceof Array) {
            animationDelay = framesDelay[this.currentFrame];
        } else {
            animationDelay = framesDelay;
        }

        if (time.previous > this.animationTimer + animationDelay) {
            this.animationTimer = time.previous;
            this.currentFrame++;
            if (this.currentFrame >= framesCount) {
                this.currentFrame = framesCount - 1;
                if (nextState) {
                    this.setState(this.states.get(nextState));
                }
            }
        }
    }

    update(time: FrameTime, camera: Camera) {
        this.position.x += this.velocity.x * this.direction * time.secondsPassed;
        this.position.y += this.velocity.y * time.secondsPassed;

        this.pushBox = asFrameMap(this.state.pushBox);

        const [head, body, legs] = this.state.hurtBox;
        this.hurtBox = [asFrameMap(head), asFrameMap(body), asFrameMap(legs)];

        this.hitBox = asFrameMap(this.state.hitBox);

        this.state.update(time);

        this.stageBordersUpdate(time, camera);

        this.attackBoxCollisionUpdate(time);
    }
}
