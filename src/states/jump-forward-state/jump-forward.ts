import {State} from "../../state";
import {FrameTime} from "../../types";
import {GRAVITY, STAGE_FLOOR, States} from "../../constants";
import {JumpState} from "../jump-state";
import {MoveState} from "../move-state";

export class JumpForwardState extends JumpState {
    constructor() {
        super();
    }

    get name(): `${States}` {
        return 'jump-forward';
    }

    init() {
        super.init();
        this.fighter.velocity.x = this.fighter.DEFAULT.VELOCITY.X[this.fighter.getStateName()];
    }

    update(time: FrameTime) {
        super.update(time);
    }
}
