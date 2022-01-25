import { FlatContext } from "./CanvasHelper";

export interface BootlegTwo {
	width?: number;
	height?: number;

	onLoad?: (gl: FlatContext) => void;
	onDraw?: (gl: FlatContext) => void;
}
