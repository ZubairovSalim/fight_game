import {Screen} from "../../screen";
import {Fighter} from "../../fighter";
import {Camera} from "../../camera";
import {FIGHTER_INIT_DISTANCE, FighterDirection, STAGE_FLOOR, STAGE_MID, States, ViewportGame} from "../../constants";
import {Jax} from "../../fighters/jax";
import {Scorpion} from "../../fighters/scorpion";
import {Controller} from "../../controller";
import {Stage} from "../../stage";
import {Statusbar} from "../../statusbar";
import {FpsCounter} from "../../fps-counter";
import {DrawingArea} from "../../drawing-area";
import {Renderable} from "../../drawing-area/types";
import {FrameTime} from "../../types";
import {Game} from "../../game";

export class BattleScreen extends Screen {
    private stage;
    private fighters: [Fighter, Fighter];
    private camera;
    private controller;
    private widgets;
    constructor(drawer: DrawingArea, game: Game) {
        super(drawer, game);
        this.controller = new Controller();
        this.stage = new Stage();
        this.fighters = this.getFighters();
        this.widgets = [
            new Statusbar(this.fighters),
            // new FpsCounter(),
        ];
        this.camera = new Camera({x: STAGE_MID - (ViewportGame.WIDTH / 2), y: 0}, this.fighters);
    }

    show() {
        this.controller.initKeyboardEvents();
    }

    update(time: FrameTime) {
        for (const entity of [this.camera, this.stage, ...this.fighters, ...this.widgets]) {
            if ('update' in entity && typeof entity.update === 'function') {
                entity.update(time, this.camera);
            }
        }
        if (this.controller.isKeyPressed('Space') && this.fighters.some(fighter => fighter.getStateName() === States.WIN)) {
            this.game.startBattle();
        }
    }

    hide() {
        this.controller.removeKeyboardEvents();
    }

    render() {
        for (const entity of [this.camera, this.stage, ...this.fighters, ...this.widgets]) {
            this.drawer.render(entity as Renderable, this.camera);
        }
    }

    getFighters() {
        const fighters: [Fighter, Fighter] = [
            new Jax({x: STAGE_MID - FIGHTER_INIT_DISTANCE, y: STAGE_FLOOR}, FighterDirection.RIGHT, this.controller),
            new Scorpion({x: STAGE_MID + FIGHTER_INIT_DISTANCE, y: STAGE_FLOOR}, FighterDirection.LEFT, this.controller),
        ];

        fighters[0].enemy = fighters[1];
        fighters[1].enemy = fighters[0];

        return fighters;
    }
}
