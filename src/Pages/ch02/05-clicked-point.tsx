import React, { useEffect, useState } from "react";

import { Optional } from "@andrew-r-king/react-kitchen";

import { BasicCanvas, CanvasMouseEvent } from "Components";
import { BootlegThree, WebGLContext } from "GL";
import { useWebGL } from "Hooks";

export const title = "Ch02: Clicked Point";

/*
	attribute, uniform - storage qualifier

	attribute - data that differs for each vertex (only valid in vertex shaders)
	uniform - data that is the same for each vertex
*/

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

class Program implements BootlegThree {
	position: number = 0;
	pointSize: number = 0;
	points: number[] = [];

	onLoad = (gl: WebGLContext): void => {
		if (!gl.program) throw gl.errors.programNotFound();

		this.position = gl.check(gl.getAttribLocation, gl.program, "a_Position");

		this.pointSize = gl.check(gl.getAttribLocation, gl.program, "a_PointSize");
		gl.vertexAttrib1f(this.pointSize, 10.0);
	};

	onDraw = (gl: WebGLContext): void => {
		gl.clearColor(0.0, 0.0, 0.0, 1.0);

		gl.clear(gl.COLOR_BUFFER_BIT);

		for (let i = 0; i < this.points.length; i += 2) {
			gl.vertexAttrib3f(this.position, this.points[i], this.points[i + 1], 0.0);
			gl.drawArrays(gl.POINTS, 0, 1);
		}
	};

	onMouseMove = (ev: CanvasMouseEvent, gl: WebGLContext): void => {
		if (!gl) return;

		this.points.push(ev.normalX);
		this.points.push(ev.normalY);

		this.onDraw(gl);
	};
}

const Component = () => {
	const [impl] = useState<Program>(new Program());
	const props = useWebGL(impl, vert, frag);

	return <BasicCanvas {...props} />;
};

export default Component;
