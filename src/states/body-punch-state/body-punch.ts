import {State} from "../../state";
import {FrameTime, FullFrame} from "../../types";
import {FighterDirection, HitBox, Keys, PushBox, States} from "../../constants";
import {BodyHitState} from "../body-hit-state";

export class BodyPunchState extends BodyHitState {
    constructor(public hitFrameIndex: number) {
        super(hitFrameIndex);
    }

    get name(): `${States}` {
        return 'body-punch';
    }

    get hitBox(): FullFrame {
        return this.fighter.currentFrame === this.hitFrameIndex ? HitBox.get(States.BODY_PUNCH) : [0, 0, 0, 0];
    }

    init() {
        super.init();
    }

    update(time: FrameTime) {
        super.update(time);
    }
}
