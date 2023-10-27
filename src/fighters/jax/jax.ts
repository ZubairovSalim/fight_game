import type {FrameAnimation, Point} from "../../types";
import {Fighter} from "../../fighter";
import JaxImage from '../../images/jax-sprite.png';
import {ANIMATION_DELAY, FighterDirection, States} from "../../constants";
import {
    BackState,
    ForwardState,
    JumpState,
    JumpForwardState,
    JumpBackState,
    SitState,
    SitDownState,
    SitUpState,
    StandState,
    BodyPunchState,
    BodyKickState,
    HeadPunchState,
    HeadKickState,
    HeadHurtState,
    BodyHurtState,
    JumpHurtState,
    StandUpState,
    WinState,
    LoseState,
} from "../../states";
import {State} from "../../state";
import {Controller} from "../../controller";

export class Jax extends Fighter {
    constructor(
        public position: Point,
        public direction: FighterDirection = FighterDirection.RIGHT,
        public controller: Controller
    ) {
        super(position, direction, controller);
        this.DEFAULT.DIRECTION = direction;
        this.name = 'Jax';
        this.velocity = {x: this.DEFAULT.VELOCITY.X[States.FORWARD], y: 0};
        this.frames = Jax.getFrames();
        this.currentFrame = 0;
        this.style.src = JaxImage;
        this.states = Jax.getStates();
        this.setState(this.states.get(States.STAND));
    }

    public static addStateWithFrame(state: State, frameAnimation: FrameAnimation) {
        Jax.availableStates.set(state.name, state);
        Jax.availableFrames.set(state.name, frameAnimation);
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
        }
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

Jax.addStateWithFrame(new StandState(), [[70, 10, 54, 110], 7, ANIMATION_DELAY]);
Jax.addStateWithFrame(new ForwardState(), [[56, 120, 52, 110], 7, ANIMATION_DELAY]);
Jax.addStateWithFrame(new BackState(), [[368, 120, 52, 110], 7, ANIMATION_DELAY, -1]);
Jax.addStateWithFrame(new JumpState(), [[770, 120, 54, 110], 2, [200, ANIMATION_DELAY]]);
Jax.addStateWithFrame(new JumpForwardState(), [[905, 130, 44, 108], 8, [200, 80, 80, 80, 80, 80, 80, 0]]);
Jax.addStateWithFrame(new JumpBackState(), [[1213, 130, 44, 108], 8, [200, 80, 80, 80, 80, 80, 80, 0], -1]);
Jax.addStateWithFrame(new SitState(), [[719, 10, 52, 110], 1, 0]);
Jax.addStateWithFrame(new SitDownState(), [[667, 10, 52, 110], 2, [100, 0]]);
Jax.addStateWithFrame(new SitUpState(), [[719, 10, 52, 110], 2, [0, 100], -1]);
Jax.addStateWithFrame(new BodyPunchState(2), [[0, 509, 66, 108], 5, [60, 60, 120, 60, 60]]);
Jax.addStateWithFrame(new BodyKickState(4), [[0, 638, 87, 108], 8, [60, 60, 60, 60, 120, 60, 60, 60]]);
Jax.addStateWithFrame(new HeadPunchState(2), [[0, 384, 66, 108], 5, [60, 60, 120, 60, 60]]);
Jax.addStateWithFrame(new HeadKickState(4), [[719, 638, 87, 108], 8, [60, 60, 60, 60, 120, 60, 60, 60]]);
Jax.addStateWithFrame(new WinState(), [[0, 235, 76, 124], 6, ANIMATION_DELAY]);
Jax.addStateWithFrame(new LoseState(), [[467, 1233, 100, 108], 6, ANIMATION_DELAY]);
Jax.addStateWithFrame(new HeadHurtState(), [[884, 893, 55, 108], 3, [80, 120, 80]]);
Jax.addStateWithFrame(new BodyHurtState(), [[1091, 893, 45, 108], 3, [80, 120, 80]]);
Jax.addStateWithFrame(new JumpHurtState(), [[0, 1006, 108, 108], 7, 80]);
Jax.addStateWithFrame(new StandUpState(), [[846, 1006, 86, 108], 5, 80]);

