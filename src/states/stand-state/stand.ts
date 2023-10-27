import {State} from "../../state";
import {FrameTime, FullFrame} from "../../types";
import {HurtBox, Keys, PushBox, States} from "../../constants";

export class StandState extends State {
    constructor() {
        super();
    }

    get name(): `${States}` {
        return States.STAND;
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
        if (this.isKeyDown(Keys.DOWN)) {
            this.fighter.setState(this.fighter.states.get(States.SIT_DOWN));
        } else if (this.isForward()) {
            this.fighter.setState(this.fighter.states.get(States.FORWARD));
        } else if (this.isBack()) {
            this.fighter.setState(this.fighter.states.get(States.BACK));
        } else if (this.isKeyDown(Keys.UP)) {
            this.fighter.setState(this.fighter.states.get(States.JUMP));
        } else if (this.isKeyPressed(Keys.A)) {
            this.fighter.setState(this.fighter.states.get(States.BODY_PUNCH));
        } else if (this.isKeyPressed(Keys.C)) {
            this.fighter.setState(this.fighter.states.get(States.BODY_KICK));
        } else if (this.isKeyPressed(Keys.X)) {
            this.fighter.setState(this.fighter.states.get(States.HEAD_PUNCH));
        } else if (this.isKeyPressed(Keys.Z)) {
            this.fighter.setState(this.fighter.states.get(States.HEAD_KICK));
        }
        this.fighter.runDefaultAnimation(time);
        this.fighter.setOppositeDirection();
    }
}
