import {State} from "../../state";
import {FrameTime, FullFrame} from "../../types";
import {FighterDirection, HitBox, HurtBox, Keys, PushBox, States} from "../../constants";

export class HeadHitState extends State {
    constructor(public hitFrameIndex: number) {
        super();
        this.hitFrameIndex = hitFrameIndex;
    }

    get name(): `${States}` {
        return 'head-hit';
    }

    get pushBox(): FullFrame {
        return PushBox.get(States.STAND);
    }

    get hurtBox(): [FullFrame, FullFrame, FullFrame] {
        return HurtBox.get(States.STAND);
    }

    init() {
        this.fighter.velocity.x = 0;
    }

    update(time: FrameTime) {
        this.fighter.runSinglePassAnimation(time, States.STAND);
    }
}
