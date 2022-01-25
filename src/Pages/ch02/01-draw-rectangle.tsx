import { BasicCanvas } from "Components";
import { FlatContext } from "GL";
import { useCanvas } from "Hooks";

export const title = "Ch02: Draw Rectangle";

const onLoad = (ctx: FlatContext): void => {
	ctx.fillStyle = "rgba(0,0,255,1.0)";
	ctx.fillRect(120, 10, 150, 150);
};

const Component = () => {
	const [ref, ctx, error] = useCanvas(onLoad);
	return <BasicCanvas {...{ ref, error }} />;
};

export default Component;
