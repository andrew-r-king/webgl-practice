import { BasicCanvas } from "Components";
import { WebGLContext } from "GL";
import { useWebGL } from "Hooks";

export const title = "Ch02: Hello Canvas";

const onLoad = (gl: WebGLContext): void => {
	gl.clearColor(0.1, 0.7, 0.3, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
};

const Component = () => {
	const [ref, gl, error] = useWebGL(onLoad);
	return (
		<BasicCanvas
			{...{
				ref,
				error,
			}}
		/>
	);
};

export default Component;
