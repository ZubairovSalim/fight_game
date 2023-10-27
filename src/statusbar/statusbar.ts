import {Fighter} from "../fighter";
import {FrameTime} from "../types";
import {States} from "../constants";

export class Statusbar {
    private time = 99;
    private timer = 0;
    public style;
    constructor(public fighters: [Fighter, Fighter]) {
        this.style = [fighters, this.time];
    }

    update(time: FrameTime) {
        if (!this.fightersAlive()) {
            return;
        }
        if (this.time === 0) {
            // TODO перенести в глобальное состояние игры
            this.fighters[0].setWinnerAndLoserStates();
            return;
        }


        if (time.previous > this.timer + 664) {
            if (this.time > 0) {
                this.time -= 1;
            }
            this.timer = time.previous;
            this.style = [this.fighters, this.time];
        }
    }

    private fightersAlive() {
        return this.fighters.every(fighter => fighter.health > 0);
    }
}
