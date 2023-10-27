import {FrameTime, Point} from "../types";
import {Fighter} from "../fighter";
import {FighterDirection, SCROLL_BORDER, STAGE_WIDTH, ViewportGame} from "../constants";

export class Camera {
    private speed: number;
    constructor(public position: Point, public fighters: [Fighter, Fighter]) {
        this.position = position;
        this.fighters = fighters;
        this.speed = 60;
    }

    update(time: FrameTime) {
        const lowX = Math.min(this.fighters[0].position.x, this.fighters[1].position.x);
        const highX = Math.max(this.fighters[0].position.x, this.fighters[1].position.x);

        if (this.isBothFightersOnOppositeSides(lowX, highX)) {
            this.setCameraOnTheMiddleOfFighters(lowX, highX);
        } else {
            for (const fighter of this.fighters) {
                if (this.isFighterCrossBorder(fighter)) {
                    this.setCameraTrackFighter(fighter, time);
                }
            }
        }

        if (this.position.x < 0) this.position.x = 0;
        if (this.position.x > STAGE_WIDTH - ViewportGame.WIDTH) {
            this.position.x = STAGE_WIDTH - ViewportGame.WIDTH;
        }


    }

    private isFighterCrossBorder(fighter: Fighter) {
        return (
            (
                fighter.position.x < this.position.x + SCROLL_BORDER &&
                fighter.velocity.x * fighter.direction < 0
            ) || (
                fighter.position.x > this.position.x + ViewportGame.WIDTH - SCROLL_BORDER &&
                fighter.velocity.x * fighter.direction > 0
            )
        );
    }

    private setCameraTrackFighter(fighter: Fighter, time: FrameTime) {
        this.position.x += fighter.velocity.x * fighter.direction * time.secondsPassed;
    }

    private isBothFightersOnOppositeSides(lowX: number, highX: number) {
        return highX - lowX > ViewportGame.WIDTH - SCROLL_BORDER * 2;
    }

    private setCameraOnTheMiddleOfFighters(lowX: number, highX: number) {
        const midPoint = (highX - lowX) / 2;
        this.position.x = lowX + midPoint - (ViewportGame.WIDTH / 2);
    }
}
