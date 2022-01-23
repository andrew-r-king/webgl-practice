import { BasicCanvas } from "Components";

export const title = "Ch02: Hello Canvas";

const Component = () => {
	return (
		<BasicCanvas
			onLoad3D={(gl) => {
				gl.clearColor(0.1, 0.7, 0.3, 1.0);
				gl.clear(gl.COLOR_BUFFER_BIT);
			}}
		/>
	);
};

export default Component;
