import {State} from "../../state";
import {FrameTime, FullFrame} from "../../types";
import {HurtBox, Keys, PushBox, States} from "../../constants";

export class LoseState extends State {
    constructor() {
        super();
    }

    get name(): `${States}` {
        return States.LOSE;
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
        this.fighter.health = 0;
        this.fighter.enemy.setState(this.fighter.enemy.states.get(States.WIN));
    }

    update(time: FrameTime) {
        this.fighter.runSinglePassAnimation(time);
    }
}
