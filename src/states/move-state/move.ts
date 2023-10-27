import {State} from "../../state";
import {FrameTime, FullFrame} from "../../types";
import {FighterDirection, HurtBox, Keys, PushBox, States} from "../../constants";

export class MoveState extends State {
    constructor() {
        super();
    }

    get name(): `${States}` {
        return 'move';
    }

    get pushBox(): FullFrame {
        return PushBox.get(States.STAND);
    }

    get hurtBox(): [FullFrame, FullFrame, FullFrame] {
        return HurtBox.get(States.STAND);
    }

    init() {
        this.fighter.velocity.x = this.fighter.DEFAULT.VELOCITY.X[this.fighter.getStateName()];
    }

    update(time: FrameTime) {
        this.fighter.runDefaultAnimation(time);
        this.fighter.setOppositeDirection();
    }
}
