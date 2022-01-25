import { RefObject, useEffect, useRef, useState } from "react";

import { ClassType, Optional } from "@andrew-r-king/react-kitchen";

import { CanvasHelper, FlatContext } from "GL";
import { BootlegTwo } from "GL/BootlegTwo";

type OutProps = {
	ref: RefObject<HTMLCanvasElement>;
	error: Optional<Error>;
	program2d: BootlegTwo;
	ctx: Optional<FlatContext>;
	width: number;
	height: number;
	id: string;
};

function useCanvas<T extends BootlegTwo>(program: ClassType<T>, id: string = "main-canvas"): OutProps {
	const ref = useRef<HTMLCanvasElement>(null);
	const [program2d] = useState<T>(new program());
	const [error, setError] = useState<Optional<Error>>(null);
	const [ctx, setCtx] = useState<Optional<FlatContext>>(null);

	useEffect(() => {
		if (!!ref.current && ctx === null) {
			let context = CanvasHelper.create2DContext(ref.current);
			if (!!context) {
				program2d.onLoad?.(context);
				program2d.onDraw?.(context);
				setCtx(context);
			} else {
				setError(CanvasHelper.lastError);
			}
		}
	}, [ref.current]);

	return {
		ref,
		error,
		program2d,
		ctx,
		width: program2d.width ?? 400,
		height: program2d.height ?? 400,
		id,
	};
}

export { useCanvas };
