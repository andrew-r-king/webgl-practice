import { WebGLContext } from "./CanvasHelper";

abstract class BootlegThree {
	abstract onLoad(gl: WebGLContext): void;
	abstract onDraw(gl: WebGLContext): void;
}

export { BootlegThree };
