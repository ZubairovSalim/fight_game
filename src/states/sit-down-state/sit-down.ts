import {State} from "../../state";
import {FrameTime} from "../../types";
import {GRAVITY, STAGE_FLOOR, States} from "../../constants";
import {SitState} from "../sit-state";

export class SitDownState extends SitState {
    constructor() {
        super();
    }

    get name(): `${States}` {
        return 'sit-down';
    }

    init() {

    }

    update(time: FrameTime) {
        this.fighter.runSinglePassAnimation(time, States.SIT);
    }
}
