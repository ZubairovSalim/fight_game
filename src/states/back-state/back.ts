import {State} from "../../state";
import {FrameTime} from "../../types";
import {Fighter} from "../../fighter";
import {Keys, States} from "../../constants";
import {MoveState} from "../move-state";
import * as http from "http";

export class BackState extends MoveState {
    constructor() {
        super();
    }

    get name(): `${States}` {
        return 'back';
    }

    init() {
        super.init();
    }

    update(time: FrameTime) {
        if (!this.isBack()) {
            this.fighter.setState(this.fighter.states.get(States.STAND));
        } else if (this.isKeyDown(Keys.DOWN)) {
            this.fighter.setState(this.fighter.states.get(States.SIT_DOWN));
        } else if (this.isKeyDown(Keys.UP)) {
            this.fighter.setState(this.fighter.states.get(States.JUMP_BACK));
        } else if (this.isForward()) {
            this.fighter.setState(this.fighter.states.get(States.FORWARD));
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
