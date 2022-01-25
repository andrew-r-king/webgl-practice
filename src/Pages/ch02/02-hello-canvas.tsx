import { useState } from "react";

import { BasicCanvas } from "Components";
import { BootlegThree, WebGLContext } from "GL";
import { useWebGL } from "Hooks";

export const title = "Ch02: Hello Canvas";

class Program implements BootlegThree {
	onDraw = (gl: WebGLContext): void => {
		gl.clearColor(0.1, 0.7, 0.3, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
	};
}

const Component = () => {
	const [impl] = useState<Program>(new Program());
	const props = useWebGL(impl);

	return <BasicCanvas {...props} />;
};

export default Component;
