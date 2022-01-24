import { BasicCanvas } from "Components";
import { FlatContext } from "GL";

export const title = "Ch02: Draw Rectangle";

const onLoad2D = (ctx: FlatContext): void => {
	ctx.fillStyle = "rgba(0,0,255,1.0)";
	ctx.fillRect(120, 10, 150, 150);
};

const Component = () => {
	return <BasicCanvas {...{ onLoad2D }} />;
};

export default Component;
