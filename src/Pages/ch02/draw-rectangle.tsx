import { BasicCanvas } from "Components";

export const title = "Ch02: Draw Rectangle";

const Component = () => {
	return (
		<BasicCanvas
			onLoad2D={(ctx) => {
				ctx.fillStyle = "rgba(0,0,255,1.0)";
				ctx.fillRect(120, 10, 150, 150);
			}}
		/>
	);
};

export default Component;
