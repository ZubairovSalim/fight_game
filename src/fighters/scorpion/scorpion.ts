import type {Frame, Point, FrameAnimation} from "../../types";
import {Fighter} from "../../fighter";
import ScorpionImage from '../../images/scorpion-sprite.png';
import {ANIMATION_DELAY, FighterDirection, States} from "../../constants";
import {
    BackState,
    BodyKickState,
    BodyPunchState,
    ForwardState,
    HeadKickState,
    HeadPunchState,
    JumpState,
    SitDownState,
    SitState,
    SitUpState,
    StandState,
    JumpForwardState,
    JumpBackState,
    HeadHurtState,
    BodyHurtState,
    JumpHurtState,
    StandUpState,
    WinState,
    LoseState,
} from "../../states";
import {State} from "../../state";
import {Controller} from "../../controller";

export class Scorpion extends Fighter {
    constructor(
        public position: Point,
        public direction: FighterDirection = FighterDirection.RIGHT,
        public controller: Controller
    ) {
        super(position, direction, controller);
        this.DEFAULT.DIRECTION = direction;
        this.name = 'Scorpion';
        this.velocity = {x: this.DEFAULT.VELOCITY.X[States.FORWARD], y: 0};
        this.frames = Scorpion.getFrames();
        this.currentFrame = 0;
        this.style.src = ScorpionImage;
        this.states = Scorpion.getStates();
        this.setState(this.states.get(States.STAND));
    }

    public static addStateWithFrame(state: State, frameAnimation: FrameAnimation) {
        Scorpion.availableStates.set(state.name, state);
        Scorpion.availableFrames.set(state.name, frameAnimation);
    }

    public DEFAULT = {
        DIRECTION: FighterDirection.RIGHT,
        VELOCITY: {
            X: {
                [States.FORWARD]: 80,
                [States.BACK]: -60,
                [States.JUMP_FORWARD]: 100,
                [States.JUMP_BACK]: -80,
                [States.JUMP_HURT]: 60,
            },
            Y: {
                [States.JUMP]: -480,
                [States.JUMP_HURT]: -250,
            }
        },
    };

    private static availableStates = new Map<string, State>();
    private static availableFrames = new Map<string, FrameAnimation>();
    private static getStates() {
        return this.availableStates;
    }
    private static getFrames() {
        return this.availableFrames;
    }
}

Scorpion.addStateWithFrame(new StandState(), [[88, 21, 58, 103], 7, ANIMATION_DELAY]);
Scorpion.addStateWithFrame(new ForwardState(), [[69, 150, 59, 100], 8, ANIMATION_DELAY]);
Scorpion.addStateWithFrame(new BackState(), [[482, 150, 59, 100], 8, ANIMATION_DELAY, -1]);
Scorpion.addStateWithFrame(new JumpState(), [[578, 143, 55, 110], 3, [ANIMATION_DELAY, 200, ANIMATION_DELAY]]);
Scorpion.addStateWithFrame(new JumpForwardState(), [[779, 149, 43, 101], 8, [200, 80, 80, 80, 80, 80, 80, 0]]);
Scorpion.addStateWithFrame(new JumpBackState(), [[1080, 149, 43, 101], 8, [200, 80, 80, 80, 80, 80, 80, 0], -1]);
Scorpion.addStateWithFrame(new SitState(), [[1043, 21, 58, 100], 1, 0]);
Scorpion.addStateWithFrame(new SitDownState(), [[985, 21, 58, 100], 2, [100, 0]]);
Scorpion.addStateWithFrame(new SitUpState(), [[1043, 21, 58, 100], 2, [0, 100], -1]);
Scorpion.addStateWithFrame(new BodyPunchState(1), [[15, 377, 73, 103], 3, [60, 120, 60]]);
Scorpion.addStateWithFrame(new BodyKickState(4), [[745, 377, 83, 103], 10, [60, 60, 60, 60, 120, 60, 60, 60, 60, 60]]);
Scorpion.addStateWithFrame(new HeadPunchState(2), [[15, 263, 73, 103], 5, [60, 60, 120, 60, 60]]);
Scorpion.addStateWithFrame(new HeadKickState(4), [[15, 492, 83, 103], 10, [60, 60, 60, 60, 120, 60, 60, 60, 60, 60]]);
Scorpion.addStateWithFrame(new WinState(), [[1209, 132, 62, 118], 4, ANIMATION_DELAY]);
Scorpion.addStateWithFrame(new LoseState(), [[21, 971, 117, 103], 6, ANIMATION_DELAY]);
Scorpion.addStateWithFrame(new HeadHurtState(), [[898, 492, 56, 103], 5, ANIMATION_DELAY]);
Scorpion.addStateWithFrame(new BodyHurtState(), [[1209, 492, 66, 103], 7, 60]);
Scorpion.addStateWithFrame(new JumpHurtState(), [[6, 971, 117, 103], 6, 80]);
Scorpion.addStateWithFrame(new StandUpState(), [[1209, 609, 72, 103], 5, 80]);
