import {State} from "../../state";
import {FrameTime} from "../../types";
import {GRAVITY, STAGE_FLOOR, States} from "../../constants";
import {SitState} from "../sit-state";

export class SitUpState extends SitState {
    constructor() {
        super();
    }

    get name(): `${States}` {
        return 'sit-up';
    }

    init() {

    }

    update(time: FrameTime) {
        const [startFrame, framesCount, framesDelay] = this.fighter.frames.get(this.name);
        let animationDelay: number;

        if (framesDelay instanceof Array) {
            animationDelay = framesDelay[this.fighter.currentFrame];
        } else {
            animationDelay = framesDelay;
        }

        if (time.previous > this.fighter.animationTimer + animationDelay) {
            this.fighter.animationTimer = time.previous;
            this.fighter.currentFrame++;
            if (this.fighter.currentFrame >= framesCount) {
                this.fighter.currentFrame = framesCount - 1;
                this.fighter.setState(this.fighter.states.get(States.STAND));
            }
        }
    }
}
