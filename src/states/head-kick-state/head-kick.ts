import {State} from "../../state";
import {FrameTime, FullFrame} from "../../types";
import {FighterDirection, HitBox, Keys, PushBox, States} from "../../constants";
import {HeadHitState} from "../head-hit-state";

export class HeadKickState extends HeadHitState {
    constructor(public hitFrameIndex: number) {
        super(hitFrameIndex);
    }

    get name(): `${States}` {
        return 'head-kick';
    }

    get hitBox(): FullFrame {
        return this.fighter.currentFrame === this.hitFrameIndex ? HitBox.get(States.HEAD_KICK) : [0, 0, 0, 0];
    }

    init() {
        super.init();
    }

    update(time: FrameTime) {
        super.update(time);
    }
}
