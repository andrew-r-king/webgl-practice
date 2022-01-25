import { useEffect, useState } from "react";

import { BasicCanvas } from "Components";
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

	onLoad = (gl: WebGLContext): void => {
		if (!gl.program) throw gl.errors.programNotFound();

		this.position = gl.check(gl.getAttribLocation, gl.program, "a_Position");
		gl.vertexAttrib3fv(this.position, [0.0, 0.5, 0.0]);

		this.pointSize = gl.check(gl.getAttribLocation, gl.program, "a_PointSize");
		gl.vertexAttrib1f(this.pointSize, 10.0);
	};

	onDraw = (gl: WebGLContext): void => {
		gl.clearColor(0.0, 0.0, 0.0, 1.0);

		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.drawArrays(gl.POINTS, 0, 1);
	};
}

const Component = () => {
	const [impl] = useState<Program>(new Program());
	const [props, gl] = useWebGL(impl, vert, frag);

	return <BasicCanvas {...props} />;
};

export default Component;
