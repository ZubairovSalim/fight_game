import {State} from "../../state";
import {FrameTime, FullFrame} from "../../types";
import {GRAVITY, HurtBox, Keys, PushBox, STAGE_FLOOR, States} from "../../constants";

export class SitState extends State {
    constructor() {
        super();
    }

    get name(): `${States}` {
        return 'sit';
    }

    get pushBox(): FullFrame {
        return PushBox.get(States.SIT);
    }

    get hurtBox(): [FullFrame, FullFrame, FullFrame] {
        return HurtBox.get(States.SIT);
    }

    init() {
        this.fighter.velocity.x = 0;
    }

    update(time: FrameTime) {
        this.fighter.setOppositeDirection();
        if (this.isKeyUp(Keys.DOWN) || this.isKeyDown(Keys.UP)) {
            this.fighter.setState(this.fighter.states.get(States.SIT_UP));
        }
    }
}
