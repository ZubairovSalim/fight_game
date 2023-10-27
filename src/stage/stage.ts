import type {Size, Point, ColorType} from "../types";
import {ViewportGame} from "../constants";

import Back1 from '../images/background.png';
import Back2 from '../images/background2.png';
import Back3 from '../images/background3.png';

const Back1Image = new Image();
Back1Image.src = Back1;

const Back2Image = new Image();
Back2Image.src = Back2;

const Back3Image = new Image();
Back3Image.src = Back3;

export class Stage {
    constructor(
        public position: Point = {x: 0, y: 0},
        public style: HTMLImageElement = Back3Image,
        public size: Size = {width: ViewportGame.WIDTH, height: ViewportGame.HEIGHT}) {
        this.position = position;
        this.style = style;
        this.size = size;
    }
}
