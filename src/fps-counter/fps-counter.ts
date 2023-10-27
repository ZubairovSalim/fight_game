import {FrameTime, Point, Size} from "../types";
import {ViewportGame} from "../constants";

export class FpsCounter {
    public fps = 0;
    constructor(
        public style: string = `FPS`,
        public position: Point = {x: ViewportGame.WIDTH / 2, y: 50},
        public size: Size = {height: 50, width: 100}) {
        this.position = position;
        this.style = `FPS: ${this.fps}`;
        this.size = size;
    }

    update(time: FrameTime) {
        this.fps = Math.trunc(1 / time.secondsPassed);
        this.style = `FPS: ${this.fps}`;
    }
}
