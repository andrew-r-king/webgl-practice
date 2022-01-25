import { useState } from "react";

import { BasicCanvas } from "Components";
import { BootlegThree, WebGLContext } from "GL";
import { useWebGL } from "Hooks";

export const title = "Ch02: Hello Canvas";

class HelloCanvas extends BootlegThree {
	position: number = 0;
	pointSize: number = 0;

	onLoad = (_gl: WebGLContext): void => {};

	onDraw = (gl: WebGLContext): void => {
		gl.clearColor(0.1, 0.7, 0.3, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
	};
}

const Component = () => {
	const [impl] = useState<HelloCanvas>(new HelloCanvas());
	const [props, gl] = useWebGL(impl);
	return <BasicCanvas {...props} />;
};

export default Component;
