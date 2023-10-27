import {FrameMap, Point} from "../types";
import {FighterDirection} from "../constants";

export function hasOverlap(a: FrameMap, b: FrameMap): boolean {
    return a.x + a.width > b.x && a.x < b.x + b.width && a.y < b.y + b.height && a.y + a.height > b.y;
}

export function getRealBoxDimensions(position: Point, direction: FighterDirection, box: FrameMap): FrameMap {
    const x1 = position.x + (box.x * direction);
    const x2 = x1 + (box.width * direction);

    return {
        x: Math.min(x1, x2),
        y: position.y + box.y,
        width: box.width,
        height: box.height,
    }
}
