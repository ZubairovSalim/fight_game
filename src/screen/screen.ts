import {DrawingArea} from "../drawing-area";
import {FrameTime} from "../types";
import {Game} from "../game";

export abstract class Screen {
    constructor(protected drawer: DrawingArea, protected game: Game) {
        this.drawer = drawer;
        this.game = game;
    }

    public abstract show(): void;
    public abstract hide(): void;

    public abstract update(time: FrameTime): void;
    public abstract render(): void;
}
