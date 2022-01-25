import React from "react";

import { WebGLContext } from "./CanvasHelper";

export type CanvasMouseEvent = React.MouseEvent & {
	target: HTMLCanvasElement;
	normalX: number;
	normalY: number;
};

export interface BootlegThree {
	width?: number;
	height?: number;
	vert?: string;
	frag?: string;

	onLoad?: (gl: WebGLContext) => void;
	onDraw?: (gl: WebGLContext) => void;
	onMouseDown?: (ev: CanvasMouseEvent, gl: WebGLContext) => void;
	onMouseUp?: (ev: CanvasMouseEvent, gl: WebGLContext) => void;
	onMouseMove?: (ev: CanvasMouseEvent, gl: WebGLContext) => void;
}
