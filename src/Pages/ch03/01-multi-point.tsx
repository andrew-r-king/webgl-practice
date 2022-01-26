import { Canvas } from "Components";
import { BootlegThree, WebGLContext } from "GL";
import { useWebGL } from "Hooks";

export const title = "Ch03: Multi-point";

const vert: string = `void main() {
	gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
	gl_PointSize = 10.0;
}`;

const frag: string = `void main() {
	gl_FragColor = vec4(0.0, 1.0, 0.3, 1.0);
}`;

class Program implements BootlegThree {
	vert = vert;
	frag = frag;

	position: number = 0;
	pointSize: number = 0;

	onLoad = (gl: WebGLContext): void => {
		if (!gl.program) throw gl.errors.programNotFound();
	};

	onDraw = (gl: WebGLContext): void => {
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.drawArrays(gl.POINTS, 0, 1);
	};
}

const Component = () => {
	const props = useWebGL(Program);
	return <Canvas {...props} />;
};

export default Component;
