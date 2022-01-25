import { RefObject, useEffect, useRef, useState } from "react";

import { Optional } from "@andrew-r-king/react-kitchen";

import { CanvasHelper, FlatContext } from "GL";
import { BootlegTwo } from "GL/BootlegTwo";

type OutProps = {
	ref: RefObject<HTMLCanvasElement>;
	error: Optional<Error>;
	program2d: BootlegTwo;
	ctx: Optional<FlatContext>;
};

const useCanvas = (impl: BootlegTwo): OutProps => {
	const ref = useRef<HTMLCanvasElement>(null);
	const [error, setError] = useState<Optional<Error>>(null);
	const [ctx, setCtx] = useState<Optional<FlatContext>>(null);

	useEffect(() => {
		if (!!ref.current && ctx === null) {
			let context = CanvasHelper.create2DContext(ref.current);
			if (!!context) {
				impl.onLoad?.(context);
				impl.onDraw?.(context);
				setCtx(context);
			} else {
				setError(CanvasHelper.lastError);
			}
		}
	}, [ref.current]);

	return { ref, error, program2d: impl, ctx };
};

export { useCanvas };
