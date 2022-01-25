import { FlatContext } from "./CanvasHelper";

export interface BootlegTwo {
	onLoad?: (gl: FlatContext) => void;
	onDraw?: (gl: FlatContext) => void;
}
