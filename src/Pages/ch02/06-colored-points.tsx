import React from "react";

import { Optional } from "@andrew-r-king/react-kitchen";

import { Canvas } from "Components";
import { normalize, remap } from "Functions";
import { BootlegThree, CanvasMouseEvent, WebGLContext } from "GL";
import { useWebGL } from "Hooks";
import { ColorRGBA, Vec2 } from "Types";

export const title = "Ch02: Colored Point";

const vert: string = `
attribute vec4 a_Position;
attribute float a_PointSize;

void main() {
	gl_Position = a_Position;
	gl_PointSize = a_PointSize;
}`;

const frag: string = `
precision highp float;
uniform vec4 u_FragColor;

void main() {
	gl_FragColor = u_FragColor;
}`;

class Program implements BootlegThree {
	vert = vert;
	frag = frag;

	position: number = 0;
	pointSize: number = 0;
	fragColor: Optional<WebGLUniformLocation> = null;
	points: Vec2[] = [];
	colors: ColorRGBA[] = [];

	onLoad = (gl: WebGLContext): void => {
		if (!gl.program) throw gl.errors.programNotFound();

		this.position = gl.check(gl.getAttribLocation, gl.program, "a_Position");

		this.pointSize = gl.check(gl.getAttribLocation, gl.program, "a_PointSize");
		gl.vertexAttrib1f(this.pointSize, 10.0);

		this.fragColor = gl.check(gl.getUniformLocation, gl.program, "u_FragColor");
	};

	onDraw = (gl: WebGLContext): void => {
		gl.clearColor(0.0, 0.0, 0.0, 1.0);

		gl.clear(gl.COLOR_BUFFER_BIT);

		for (let i = 0; i < this.points.length; ++i) {
			const [x, y] = this.points[i];
			const [r, g, b, a] = this.colors[i];
			gl.vertexAttrib3f(this.position, x, y, 0.0);
			gl.uniform4f(this.fragColor, r, g, b, a);
			gl.drawArrays(gl.POINTS, 0, 1);
		}
	};

	mouseDown: boolean = false;

	private kPointMax: number = 100;
	private addPixelFromMouse = (ev: CanvasMouseEvent, gl: WebGLContext) => {
		this.points.push([ev.normalX, ev.normalY]);
		const colR = normalize(ev.normalX);
		const colG = normalize(ev.normalY);
		const colB = (colR - colG) / 2.0;

		this.colors.push([colR, colG, colB, 1.0]);

		if (this.points.length > this.kPointMax) {
			this.points.shift();
			this.colors.shift();
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
