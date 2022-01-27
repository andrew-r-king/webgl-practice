import React from "react";

import { WebGLContext } from "./CanvasHelper";
import { initShaders } from "./ShaderHelper";

export type CanvasMouseEvent = React.MouseEvent & {
	target: HTMLCanvasElement;
	normalX: number;
	normalY: number;
};

export abstract class BootlegThree {
	width?: number;
	height?: number;

	protected createProgram = (gl: WebGLContext, vert: string, frag: string) => {
		let program = initShaders(gl, vert, frag);
		if (!!program) {
			gl.program = program;
		} else {
			throw gl.errors.programNotFound();
		}
	};

	onLoad?: (gl: WebGLContext) => void;
	onDraw?: (gl: WebGLContext) => void;

	onMouseDown?: (ev: CanvasMouseEvent, gl: WebGLContext) => void;
	onMouseUp?: (ev: CanvasMouseEvent, gl: WebGLContext) => void;
	onMouseMove?: (ev: CanvasMouseEvent, gl: WebGLContext) => void;
}
