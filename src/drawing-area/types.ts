import type {Size, Point, ColorType, Frames, FullFrame, FrameMap} from "../types";
import {State} from "../state";
import {FighterDirection} from "../constants";

export interface Renderable {
    position: Point;
    direction: FighterDirection;
    size: Size;
    style?: ColorType | HTMLImageElement;
    frames?: Frames;
    currentFrame: number;
    state?: State;
    pushBox: FrameMap;
    hurtBox: [FrameMap, FrameMap, FrameMap];
    hitBox: FrameMap;
}
