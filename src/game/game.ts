import {DrawingArea} from "../drawing-area";
import {BattleScreen} from "../screens";
import {Screen} from "../screen";

export class Game {
    private drawingArea;
    private frameTime;
    private currentScreen: Screen;
    constructor() {
        this.drawingArea = this.getDrawingArea();
        this.frameTime = {
            previous: 0,
            secondsPassed: 0,
        };
    }

    startBattle() {
        this.showScreen(new BattleScreen(this.drawingArea, this));
    }

    private showScreen(screen: Screen) {
        if (this.currentScreen) {
            this.currentScreen.hide();
        }
        this.currentScreen = screen;
        this.currentScreen.show();
    }

    private getDrawingArea() {
        const canvas = document.querySelector('canvas');
        const context = canvas.getContext('2d');
        context.imageSmoothingEnabled = false;
        return new DrawingArea(canvas, context);
    }

    private update() {
        this.currentScreen.update(this.frameTime);
    }

    private render() {
        this.currentScreen.render();
    }

    private frame(time: number) {
        window.requestAnimationFrame((time) => this.frame(time));

        this.frameTime.secondsPassed = (time - this.frameTime.previous) / 1000;
        this.frameTime.previous = time;

        this.update();
        this.render();
    }

    start() {
        this.startBattle();
        window.requestAnimationFrame((time) => this.frame(time));
    }
}
