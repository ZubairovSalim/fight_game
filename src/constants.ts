import {FullFrame} from "./types";

export enum ViewportGame {
    WIDTH = 350,
    HEIGHT = 298,
}

export const ANIMATION_DELAY = 100;

export const STAGE_FLOOR = 200;
export const STAGE_WIDTH = 511;
export const STAGE_MID = STAGE_WIDTH / 2;

export const SCROLL_BORDER = 67;


export enum FighterDirection {
    LEFT= -1,
    RIGHT = 1,
}

export const FIGHTER_INIT_DISTANCE = 88;

export enum States {
    STAND = 'stand',
    FORWARD = 'forward',
    BACK = 'back',
    JUMP = 'jump',
    JUMP_FORWARD = 'jump-forward',
    JUMP_BACK = 'jump-back',
    SIT = 'sit',
    SIT_UP = 'sit-up',
    SIT_DOWN = 'sit-down',
    MOVE = 'move',
    BODY_HIT = 'body-hit',
    BODY_PUNCH = 'body-punch',
    BODY_KICK = 'body-kick',
    HEAD_HIT = 'head-hit',
    HEAD_PUNCH = 'head-punch',
    HEAD_KICK = 'head-kick',
    HEAD_HURT = 'head-hurt',
    BODY_HURT = 'body-hurt',
    JUMP_HURT = 'jump-hurt',
    STAND_UP = 'stand-up',
    WIN = 'win',
    LOSE = 'lose',
}

export const PUSH_FRICTION = 30;
export const PushBox = new Map<
    States.STAND | States.JUMP | States.SIT,
    FullFrame
>([
    [States.STAND, [-20, -100, 40, 90]],
    [States.JUMP, [-20, -91, 40, 80]],
    [States.SIT, [-20, -60, 40, 60]],
]);

export const HurtBox = new Map<
    States.STAND | States.JUMP | States.SIT | 'PUNCH',
    [FullFrame, FullFrame, FullFrame]
>([
    [States.STAND, [[-5, -103, 20, 15], [-16, -88, 32, 36], [-16, -52, 32, 42]]],
    [States.JUMP, [[-5, -90, 20, 15], [-16, -75, 32, 27], [-16, -48, 32, 45]]],
    [States.SIT, [[0, -60, 20, 15], [-16, -53, 32, 24], [-16, -30, 32, 30]]],
    ['PUNCH', [[11, -94, 20, 15], [-16, -77, 32, 43], [-16, -33, 32, 33]]],
]);

export const HitBox = new Map<
    States.HEAD_PUNCH | States.HEAD_KICK | States.BODY_PUNCH | States.BODY_KICK,
    FullFrame
>([
    [States.HEAD_PUNCH, [-3, -100, 40, 12]],
    [States.HEAD_KICK, [5, -93, 40, 15]],
    [States.BODY_PUNCH, [-15, -85, 50, 14]],
    [States.BODY_KICK, [0, -75, 45, 20]],
]);

export enum Keys {
    RIGHT = 'keyRight',
    LEFT = 'keyLeft',
    UP = 'keyUp',
    DOWN = 'keyDown',
    A = 'keyA',
    B = 'keyB',
    C = 'keyC',
    X = 'keyX',
    Y = 'keyY',
    Z = 'keyZ',
}

export const GRAVITY = 1000;

export const RightKeyCodes = new Map([
    [Keys.RIGHT, 'KeyD'],
    [Keys.LEFT, 'KeyA'],
    [Keys.UP, 'KeyW'],
    [Keys.DOWN, 'KeyS'],
    [Keys.A, 'KeyZ'],
    [Keys.B, 'KeyX'],
    [Keys.C, 'KeyC'],
    [Keys.X, 'KeyQ'],
    [Keys.Y, 'KeyR'],
    [Keys.Z, 'KeyE'],
]);

export const LeftKeyCodes = new Map([
    [Keys.RIGHT, 'ArrowRight'],
    [Keys.LEFT, 'ArrowLeft'],
    [Keys.UP, 'ArrowUp'],
    [Keys.DOWN, 'ArrowDown'],
    [Keys.A, 'Comma'],
    [Keys.B, 'Period'],
    [Keys.C, 'Slash'],
    [Keys.X, 'KeyK'],
    [Keys.Y, 'KeyL'],
    [Keys.Z, 'Semicolon'],
]);

export const KeyCodeMap = new Map([
    [FighterDirection.LEFT, LeftKeyCodes],
    [FighterDirection.RIGHT, RightKeyCodes],
]);
