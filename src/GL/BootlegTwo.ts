import { FlatContext } from "./CanvasHelper";

export abstract class BootlegTwo {
	width?: number;
	height?: number;

	constructor() {}

	onLoad?: (gl: FlatContext) => void;
	onDraw?: (gl: FlatContext) => void;
}
