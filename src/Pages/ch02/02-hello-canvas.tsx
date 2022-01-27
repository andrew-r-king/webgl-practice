import { Canvas } from "Components";
import { BootlegThree, WebGLContext } from "GL";
import { useWebGL } from "Hooks";

export const title = "Ch02: Hello Canvas";

class Program extends BootlegThree {
	onLoad = (gl: WebGLContext): void => {
		gl.clearColor(0.1, 0.7, 0.3, 1.0);
	};

	onDraw = (gl: WebGLContext): void => {
		gl.clear(gl.COLOR_BUFFER_BIT);
	};
}

const Component = () => {
	const props = useWebGL(Program);
	return <Canvas {...props} />;
};

export default Component;
