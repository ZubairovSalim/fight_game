import {State} from "../../state";
import {FrameTime, FullFrame} from "../../types";
import {HurtBox, PushBox, States} from "../../constants";

export class StandUpState extends State {
    constructor() {
        super();
    }

    get name(): `${States}` {
        return States.STAND_UP;
    }

    get pushBox(): FullFrame {
        return PushBox.get(States.STAND);
    }

    get hurtBox(): [FullFrame, FullFrame, FullFrame] {
        return HurtBox.get(States.STAND);
    }

    init() {
        this.fighter.velocity.x = 0;
        this.fighter.velocity.y = 0;
    }

    update(time: FrameTime) {
        this.fighter.runSinglePassAnimation(time, States.STAND);
    }
}
