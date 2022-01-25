import { useState } from "react";

import { BasicCanvas } from "Components";
import { BootlegThree, WebGLContext } from "GL";
import { useWebGL } from "Hooks";

export const title = "Ch02: Hello Point (1)";

/*
	Notes:
		gl_Position = vec4(0.0, 0.0, 0.0, 1.0)
		vec4 in this case refers to a homogeneous coordinate, equivalent to:
			vec3(0.0/1.0, 0.0/1.0, 0.0/1.0)

		hence, if you set 1.0 to 0.0, you are dividing by zero, so the coordinate
		disappears into the void

*/

const vert: string = `void main() {
	gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
	gl_PointSize = 10.0;
}`;

const frag: string = `void main() {
	gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
}`;

class HelloPoint1 extends BootlegThree {
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
	const [impl] = useState<HelloPoint1>(new HelloPoint1());
	const [props] = useWebGL(impl, vert, frag);
	return <BasicCanvas {...props} />;
};

export default Component;
