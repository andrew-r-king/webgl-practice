import { BasicCanvas } from "Components";

export const title = "Ch02: Hello Point";

/*
	Notes:
		gl_Position = vec4(0.0, 0.0, 0.0, 1.0)
		vec4 in this case refers to a homogeneous coordinate, equivalent to:
			vec3(0.0/1.0, 0.0/1.0, 0.0/1.0)

		hence, if you set 1.0 to 0.0, you are dividing by zero, so the coordinate
		disappears into the void

*/

const VSHADER_SOURCE: string = `void main() {
	gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
	gl_PointSize = 10.0;
}`;

const FSHADER_SOURCE: string = `void main() {
	gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
}`;

const Component = () => {
	return (
		<BasicCanvas
			vertexShader={VSHADER_SOURCE}
			fragmentShader={FSHADER_SOURCE}
			onLoad3D={(gl) => {
				gl.clearColor(0.0, 0.0, 0.0, 1.0);

				gl.clear(gl.COLOR_BUFFER_BIT);

				gl.drawArrays(gl.POINTS, 0, 1);
			}}
		/>
	);
};

export default Component;
