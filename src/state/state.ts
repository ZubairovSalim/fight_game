import {Fighter} from "../fighter";
import {FrameTime, FullFrame} from "../types";
import {FighterDirection, KeyCodeMap, Keys, States} from "../constants";

export abstract class State {
    protected fighter: Fighter;

    protected constructor() {}
    public setFighter(fighter: Fighter, ...args: unknown[]) {
        this.fighter = fighter;
        this.init(args);
    }

    public abstract init(...args: unknown[]): void;
    public abstract update(time: FrameTime): void;

    public abstract get name(): `${States}`;
    public abstract get pushBox(): FullFrame;
    public abstract get hurtBox(): [FullFrame, FullFrame, FullFrame];
    public get hitBox(): FullFrame {
        return [0, 0, 0, 0];
    }

    public isKeyDown(key: Keys) {
        const keyCode = KeyCodeMap.get(this.fighter.DEFAULT.DIRECTION).get(key);
        return this.fighter.controller.isKeyDown(keyCode);
    }

    public isKeyUp(key: Keys) {
        const keyCode = KeyCodeMap.get(this.fighter.DEFAULT.DIRECTION).get(key);
        return this.fighter.controller.isKeyUp(keyCode);
    }

    public isKeyPressed(key: Keys) {
        const keyCode = KeyCodeMap.get(this.fighter.DEFAULT.DIRECTION).get(key);
        return this.fighter.controller.isKeyPressed(keyCode);
    }

    isForward() {
        return this.fighter.direction === FighterDirection.RIGHT ?
            this.isKeyDown(Keys.RIGHT) :
            this.isKeyDown(Keys.LEFT);
    }

    isBack() {
        return this.fighter.direction === FighterDirection.RIGHT ?
            this.isKeyDown(Keys.LEFT) :
            this.isKeyDown(Keys.RIGHT);
    }
}
