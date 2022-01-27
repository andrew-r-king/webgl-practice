import { Canvas } from "Components";
import { BootlegThree, VertexBuffer2D, WebGLContext } from "GL";
import { useWebGL } from "Hooks";

export const title = "Ch03: Multi-point";

const vert: string = `
attribute vec4 a_Position;

void main() {
	gl_Position = a_Position;
	gl_PointSize = 10.0;
}`;

const frag: string = `void main() {
	gl_FragColor = vec4(0.0, 1.0, 0.3, 1.0);
}`;

class Program extends BootlegThree {
	buffer: VertexBuffer2D = new VertexBuffer2D();

	onLoad = (gl: WebGLContext): void => {
		this.createProgram(gl, vert, frag);

		gl.clearColor(0.0, 0.0, 0.0, 1.0);

		let location = gl.check(gl.getAttribLocation, gl.program, "a_Position");
		this.buffer.create(gl, location);
		this.buffer.setVertices([
			0.0, 0.5,
			//
			-0.5, -0.5,
			//
			0.5, -0.5,
		]);
	};

	onDraw = (gl: WebGLContext): void => {
		gl.clear(gl.COLOR_BUFFER_BIT);

		this.buffer.draw(gl);
	};
}

const Component = () => {
	const props = useWebGL(Program);
	return <Canvas {...props} />;
};

export default Component;
