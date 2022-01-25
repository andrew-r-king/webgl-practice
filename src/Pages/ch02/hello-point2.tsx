import { BasicCanvas } from "Components";
import { WebGLContext } from "GL";

export const title = "Ch02: Hello Point (2)";

/*
	attribute, uniform - storage qualifier

	attribute - data that differs for each vertex (only valid in vertex shaders)
	uniform - data that is the same for each vertex
*/

const vert: string = `
attribute vec4 a_Position;

void main() {
	gl_Position = a_Position;
	gl_PointSize = 10.0;
}`;

const frag: string = `void main() {
	gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
}`;

const onLoad3D = (gl: WebGLContext): void => {
	if (!gl.program) throw gl.errors.programNotFound();

	const a_Position = gl.check(gl.getAttribLocation, gl.program, "a_Position");

	gl.vertexAttrib3f(a_Position, 0.0, 0.5, 0.0);

	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.POINTS, 0, 1);
};

const Component = () => {
	return (
		<BasicCanvas
			{...{
				vert,
				frag,
				onLoad3D,
			}}
		/>
	);
};

export default Component;
