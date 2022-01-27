import React from "react";

import { Canvas } from "Components";
import { BootlegThree, CanvasMouseEvent, WebGLContext } from "GL";
import { useWebGL } from "Hooks";
import { Vec2 } from "Types";

export const title = "Ch02: Clicked Points";

const vert: string = `
attribute vec4 a_Position;
attribute float a_PointSize;

void main() {
	gl_Position = a_Position;
	gl_PointSize = a_PointSize;
}`;

const frag: string = `void main() {
	gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
}`;

class Program extends BootlegThree {
	position: number = 0;
	pointSize: number = 0;
	points: Vec2[] = [];

	onLoad = (gl: WebGLContext): void => {
		this.createProgram(gl, vert, frag);

		this.position = gl.check(gl.getAttribLocation, gl.program, "a_Position");

		this.pointSize = gl.check(gl.getAttribLocation, gl.program, "a_PointSize");
		gl.vertexAttrib1f(this.pointSize, 10.0);
	};

	onDraw = (gl: WebGLContext): void => {
		gl.clearColor(0.0, 0.0, 0.0, 1.0);

		gl.clear(gl.COLOR_BUFFER_BIT);

		for (const [x, y] of this.points) {
			gl.vertexAttrib3f(this.position, x, y, 0.0);
			gl.drawArrays(gl.POINTS, 0, 1);
		}
	};

	mouseDown: boolean = false;

	private kPointMax: number = 5;
	private addPixelFromMouse = (ev: CanvasMouseEvent, gl: WebGLContext) => {
		this.points.push([ev.normalX, ev.normalY]);

		if (this.points.length > this.kPointMax * 2) {
			this.points.shift();
			this.points.shift();
		}

		this.onDraw(gl);
	};

	onMouseDown = (ev: CanvasMouseEvent, gl: WebGLContext): void => {
		this.mouseDown = true;
		this.addPixelFromMouse(ev, gl);
	};

	onMouseUp = (ev: CanvasMouseEvent, gl: WebGLContext): void => {
		this.mouseDown = false;
	};

	onMouseMove = (ev: CanvasMouseEvent, gl: WebGLContext): void => {
		if (this.mouseDown) {
			this.addPixelFromMouse(ev, gl);
		}
	};
}

const Component = () => {
	const props = useWebGL(Program);
	return <Canvas {...props} />;
};

export default Component;
