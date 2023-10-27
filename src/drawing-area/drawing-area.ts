import {Renderable} from "./types";
import {FighterDirection, STAGE_FLOOR, ViewportGame} from "../constants";
import {Stage} from "../stage";
import {Camera} from "../camera";
import {ColorType, FrameMap, FullFrame, Point} from "../types";
import {Fighter} from "../fighter";

export class DrawingArea {
    constructor(protected canvas: HTMLCanvasElement, protected canvasContext: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.canvasContext = canvasContext;
        // this.canvas.width = ViewportGame.WIDTH;
        // this.canvas.height = ViewportGame.HEIGHT;
    }

    renderDebug(obj: Renderable, camera: Camera) {
        this.canvasContext.lineWidth - 1;

        // pushBox
        this.renderBox(obj, obj.pushBox, '#55ff55', camera);

        // hurtBox
        for (const hurtBox of obj.hurtBox) {
            this.renderBox(obj, hurtBox, '#0000f0', camera);
        }

        // hitBox
        this.renderBox(obj, obj.hitBox, '#ff0000', camera);

        // frameCenter
        this.canvasContext.beginPath();
        this.canvasContext.strokeStyle = 'white';
        this.canvasContext.moveTo(obj.position.x - camera.position.x - 4, obj.position.y - 0.5);
        this.canvasContext.lineTo(obj.position.x - camera.position.x + 5, obj.position.y - 0.5);
        this.canvasContext.moveTo(obj.position.x - camera.position.x + 0.5, obj.position.y - 5);
        this.canvasContext.lineTo(obj.position.x - camera.position.x + 0.5, obj.position.y + 4);
        this.canvasContext.stroke();
    }

    renderShadow(obj: Renderable, camera: Camera) {
        this.canvasContext.globalAlpha = 0.5;
        this.canvasContext.beginPath();
        this.canvasContext.fillStyle = '#000';
        this.canvasContext.ellipse(
            obj.position.x - camera.position.x,
            STAGE_FLOOR - 4,
            4,
            Math.max((30 - (STAGE_FLOOR - obj.position.y) / 10), 0),
            Math.PI / 2,
            0, 2 *
            Math.PI);
        this.canvasContext.fill();
        this.canvasContext.globalAlpha = 1;
    }

    render(obj: Renderable, camera: Camera) {
        if (obj.style instanceof Array) {
            const [fighters, time] = obj.style;

            // fighters healths
            this.canvasContext.fillStyle = '#f00000';
            this.canvasContext.fillRect(20, 11, 100, 10);
            this.canvasContext.fillRect(240, 11, 100, 10);

            this.canvasContext.fillStyle = '#0000f0';
            this.canvasContext.fillRect(20, 11, fighters[0].health, 10); // set width as 1-st fighter's health
            this.canvasContext.fillRect(240 + (100 - fighters[1].health), 11, fighters[1].health, 10); // set width as 2-d fighter's health, and adding to x value (100 - health)

            this.canvasContext.rect(20, 11, 100, 10);
            this.canvasContext.rect(240, 11, 100, 10);

            // fighters names
            for (const [index, fighter] of fighters.entries()) {
                this.renderText(fighter.name, {x: index === 0 ? 20 : 300, y: 20}, 'white');
            }

            // fight status
            if (fighters.some((fighter: Fighter) => fighter.health === 0)) {
                // TODO перенести в глобальное состояние
                const [winner] = fighters[0].getWinnerAndLoser();
                this.renderText(`${winner.name} wins`, {x: 175, y: 50}, 'white', 'italic bold 14px arial', 'center');
                this.renderText('Press space to restart', {x: 175, y: 210}, 'white', '10px arial', 'center');
            }

            // time
            this.renderText(time, {x: 175, y: 20}, 'yellow', 'italic bold 20px arial', 'center');
        } else if (obj.style instanceof HTMLImageElement) {
            if (obj.frames) {
                const [frame,,, direction = 1] = obj.frames.get(obj.state.name);
                const [x, y, width, height] = frame;
                let currentFramePosition = x + direction * (obj.currentFrame * width);

                this.canvasContext.scale(obj.direction, 1);

                this.canvasContext.drawImage(
                    obj.style,
                    currentFramePosition,
                    y,
                    width,
                    height,
                    Math.floor((obj.position.x - camera.position.x) * obj.direction - (width / 2)),
                    Math.floor(obj.position.y - height),
                    width,
                    height
                );
                this.canvasContext.setTransform(1, 0, 0, 1, 0, 0);

                this.renderShadow(obj, camera);
                // this.renderDebug(obj, camera);
            } else if (obj instanceof Stage) {
                this.canvasContext.drawImage(obj.style, - camera.position.x, camera.position.y);
                // this.canvasContext.fillStyle = '#1b212c';
                // this.canvasContext.fillRect( - camera.position.x, camera.position.y, ViewportGame.WIDTH, ViewportGame.HEIGHT);
            } else {
                this.canvasContext.drawImage(obj.style, obj.position.x, obj.position.y);
            }
        } else if (typeof obj.style === 'string') {
            this.canvasContext.fillStyle = 'white';
            this.canvasContext.fillText(obj.style, obj.position.x, obj.position.y);
        } else if (obj.style) {
            this.canvasContext.fillStyle = obj.style;
            this.canvasContext.fillRect(obj.position.x, obj.position.y, obj.size.width, obj.size.height);
        }
    }

    private renderBox(obj: Renderable, box: FrameMap, color: ColorType, camera: Camera) {
        this.canvasContext.beginPath();
        const oldStroke = this.canvasContext.strokeStyle;
        this.canvasContext.strokeStyle = color;
        this.canvasContext.fillStyle = color;
        this.canvasContext.rect(
            Math.floor(obj.position.x - camera.position.x + (box.x * obj.direction)) + 0.5,
            Math.floor(obj.position.y + box.y) + 0.5,
            box.width * obj.direction,
            box.height,
        );
        this.canvasContext.stroke();
        this.canvasContext.strokeStyle = oldStroke;
    }

    private renderText(text: string, position: Point, style?: string, font?: string, textAlign?: CanvasTextAlign) {
        const oldFont = this.canvasContext.font;
        const oldTextAlign = this.canvasContext.textAlign;

        if (font) {
            this.canvasContext.font = font;
        }
        if (textAlign) {
            this.canvasContext.textAlign = textAlign;
        }

        this.canvasContext.fillStyle = style;
        this.canvasContext.fillText(text, position.x, position.y);

        if (font) {
            this.canvasContext.font = oldFont;
        }
        if (textAlign) {
            this.canvasContext.textAlign = oldTextAlign;
        }
    }
}
