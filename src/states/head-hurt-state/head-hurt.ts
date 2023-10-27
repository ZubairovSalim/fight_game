import {State} from "../../state";
import {FrameTime, FullFrame} from "../../types";
import {HurtBox, PushBox, States} from "../../constants";

export class HeadHurtState extends State {
    constructor() {
        super();
    }

    get name(): `${States}` {
        return States.HEAD_HURT;
    }

    get pushBox(): FullFrame {
        return PushBox.get(States.STAND);
    }

    get hurtBox(): [FullFrame, FullFrame, FullFrame] {
        return HurtBox.get(States.STAND);
    }

    init() {
        this.fighter.health -= 15;
    }

    update(time: FrameTime) {
        if (this.fighter.health > 0) {
            this.fighter.runSinglePassAnimation(time, States.STAND);
            return;
        }
        this.fighter.setState(this.fighter.states.get(States.LOSE));
    }
}
