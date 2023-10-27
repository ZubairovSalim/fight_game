export interface Size {
    width: number;
    height: number;
}

export interface Point {
    x: number;
    y: number;
}

export interface FrameTime {
    previous: number;
    secondsPassed: number;
}

export interface FrameMap {
    x: number;
    y: number;
    width: number;
    height: number;
}

export type FullFrame = [x: number, y: number, width: number, height: number];
export type Frame = [] | [x: number, y: number] | FullFrame;
export type FrameDelay = number | number[];
export type FrameAnimation = [Frame, framesCount: number, framesDelay: FrameDelay, behavior?: number];
export type Frames = Map<string, FrameAnimation>;
// если framesDelay - массив, то он должен иметь длину framesCount

export type ColorType = string | CanvasGradient | CanvasPattern;

