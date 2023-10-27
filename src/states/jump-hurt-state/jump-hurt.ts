import {State} from "../../state";
import {FrameTime, FullFrame} from "../../types";
import {FighterDirection, GRAVITY, HitBox, HurtBox, Keys, PushBox, STAGE_FLOOR, States} from "../../constants";

export class JumpHurtState extends State {
    private isFinalState = false;
    constructor() {
        super();
    }

    get name(): `${States}` {
        return States.JUMP_HURT;
    }

    get pushBox(): FullFrame {
        return PushBox.get(States.STAND);
    }

    get hurtBox(): [FullFrame, FullFrame, FullFrame] {
        return HurtBox.get(States.STAND);
    }

    init() {
        const sign = this.fighter.velocity.x * -1 > 0 ? 1 : -1;
        this.fighter.velocity.x = this.fighter.DEFAULT.VELOCITY.X[States.JUMP_HURT] * sign;
        this.fighter.velocity.y = this.fighter.DEFAULT.VELOCITY.Y[States.JUMP_HURT];
        this.fighter.health -= 20;

    }

    update(time: FrameTime) {
        if (this.isFinalState) return;
        this.fighter.runSinglePassAnimation(time);

        this.fighter.velocity.y += GRAVITY * time.secondsPassed;

        if (this.fighter.position.y > STAGE_FLOOR) {
            this.fighter.position.y = STAGE_FLOOR;
            if (this.fighter.health > 0) {
                this.fighter.setState(this.fighter.states.get(States.STAND_UP));
            } else {
                this.isFinalState = true;
                this.fighter.enemy.setState(this.fighter.enemy.states.get(States.WIN));
                this.fighter.velocity.x = 0;
                this.fighter.velocity.y = 0;
                this.fighter.health = 0;
            }
        }
    }
}
