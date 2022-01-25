import { useState } from "react";

import { BasicCanvas } from "Components";
import { FlatContext } from "GL";
import { BootlegTwo } from "GL/BootlegTwo";
import { useCanvas } from "Hooks";

export const title = "Ch02: Draw Rectangle";

class Program implements BootlegTwo {
	onDraw = (ctx: FlatContext): void => {
		ctx.fillStyle = "rgba(0,0,255,1.0)";
		ctx.fillRect(120, 10, 150, 150);
	};
}

const Component = () => {
	const [impl] = useState<Program>(new Program());
	const props = useCanvas(impl);
	return <BasicCanvas {...props} />;
};

export default Component;
