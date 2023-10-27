import {State} from "../../state";
import {FrameTime, FullFrame} from "../../types";
import {GRAVITY, HurtBox, PushBox, STAGE_FLOOR, States} from "../../constants";

export class JumpState extends State {
    constructor() {
        super();
    }

    get name(): `${States}` {
        return 'jump';
    }

    public get pushBox(): FullFrame {
        return PushBox.get(States.JUMP);
    }

    get hurtBox(): [FullFrame, FullFrame, FullFrame] {
        return HurtBox.get(States.JUMP);
    }

    init() {
        this.fighter.velocity.y = this.fighter.DEFAULT.VELOCITY.Y[States.JUMP];
    }

    update(time: FrameTime) {
        this.fighter.runSinglePassAnimation(time);

        this.fighter.velocity.y += GRAVITY * time.secondsPassed;

        if (this.fighter.position.y > STAGE_FLOOR) {
            this.fighter.position.y = STAGE_FLOOR;
            this.fighter.setState(this.fighter.states.get(States.STAND));
        }
    }
}
