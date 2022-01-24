import { BasicCanvas } from "Components";
import { WebGLContext } from "GL";

export const title = "Ch02: Hello Canvas";

const onLoad3D = (gl: WebGLContext): void => {
	gl.clearColor(0.1, 0.7, 0.3, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
};

const Component = () => {
	return <BasicCanvas {...{ onLoad3D }} />;
};

export default Component;
