import {Fighter} from "../fighter";

export class Controller {
    private heldKeys: Set<string>;
    private pressedKeys: Set<string>;
    constructor() {
        this.heldKeys = new Set();
        this.pressedKeys = new Set();
    }

    private keyDown(e: KeyboardEvent) {
        e.preventDefault();
        this.heldKeys.add(e.code);
        console.log(e.code);
    }

    private keyUp(e: KeyboardEvent) {
        e.preventDefault();
        this.heldKeys.delete(e.code);
        this.pressedKeys.delete(e.code);
        console.log(e.code);
    }

    isKeyDown(code: string) {
        return this.heldKeys.has(code);
    }

    isKeyUp(code: string) {
        return !this.heldKeys.has(code);
    }

    isKeyPressed(code: string) {
        if (this.heldKeys.has(code) && !this.pressedKeys.has(code)) {
            this.pressedKeys.add(code);
            return true;
        }
        return false;
    }

    initKeyboardEvents() {
        window.addEventListener('keydown', (e) => this.keyDown(e));
        window.addEventListener('keyup', (e) => this.keyUp(e));
    }

    removeKeyboardEvents() {
        window.removeEventListener('keydown', (e) => this.keyDown(e));
        window.removeEventListener('keyup', (e) => this.keyUp(e));
    }
}
