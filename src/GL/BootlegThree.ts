import { WebGLContext } from "./CanvasHelper";

export interface BootlegThree {
	onLoad?: (gl: WebGLContext) => void;
	onDraw?: (gl: WebGLContext) => void;
}
