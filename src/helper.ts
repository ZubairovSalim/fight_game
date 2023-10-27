import {FrameMap, FullFrame} from "./types";

export function asFrameMap(frame: FullFrame): FrameMap {
    const [x, y, width, height] = frame;
    return {x, y, width, height};
}
