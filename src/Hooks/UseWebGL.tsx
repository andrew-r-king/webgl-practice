import { RefObject, useEffect, useRef, useState } from "react";

import { Optional } from "@andrew-r-king/react-kitchen";

import { BootlegThree, CanvasHelper, initShaders, WebGLContext } from "GL";

type OutProps = {
	ref: RefObject<HTMLCanvasElement>;
	error: Optional<Error>;
	program3d: BootlegThree;
	gl: Optional<WebGLContext>;
};

const useWebGL = (impl: BootlegThree, vert?: string, frag?: string): OutProps => {
	const ref = useRef<HTMLCanvasElement>(null);
	const [error, setError] = useState<Optional<Error>>(null);
	const [gl, setGL] = useState<Optional<WebGLContext>>(null);

	useEffect(() => {
		if (!!ref.current && gl === null) {
			let context = CanvasHelper.create3DContext(ref.current);
			if (!!context) {
				try {
					if (!!vert && !!frag) {
						let program = initShaders(context, vert, frag);
						if (!!program) {
							context.program = program;
						}
					}
					impl.onLoad?.(context);
					impl.onDraw?.(context);
					setGL(context);
				} catch (err: any) {
					setError(err);
				}
			} else {
				setError(CanvasHelper.lastError);
			}
		}
	}, [ref.current]);

	return { ref, error, program3d: impl, gl };
};

export { useWebGL };
