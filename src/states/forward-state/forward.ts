import {FrameTime} from "../../types";
import {Keys, States} from "../../constants";
import {MoveState} from "../move-state";

export class ForwardState extends MoveState {
    constructor() {
        super();
    }

    get name(): `${States}` {
        return 'forward';
    }

    init() {
        super.init();
    }

    update(time: FrameTime) {
        if (!this.isForward()) {
            this.fighter.setState(this.fighter.states.get(States.STAND));
        } else if (this.isKeyDown(Keys.DOWN)) {
            this.fighter.setState(this.fighter.states.get(States.SIT_DOWN));
        } else if (this.isKeyDown(Keys.UP)) {
            this.fighter.setState(this.fighter.states.get(States.JUMP_FORWARD));
        } else if (this.isBack()) {
            this.fighter.setState(this.fighter.states.get(States.BACK));
        } else if (this.isKeyPressed(Keys.A)) {
            this.fighter.setState(this.fighter.states.get(States.BODY_PUNCH));
        } else if (this.isKeyPressed(Keys.C)) {
            this.fighter.setState(this.fighter.states.get(States.BODY_KICK));
        } else if (this.isKeyPressed(Keys.X)) {
            this.fighter.setState(this.fighter.states.get(States.HEAD_PUNCH));
        } else if (this.isKeyPressed(Keys.Z)) {
            this.fighter.setState(this.fighter.states.get(States.HEAD_KICK));
        }
        super.update(time);
    }
}
