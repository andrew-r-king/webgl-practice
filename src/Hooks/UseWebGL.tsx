import { RefObject, useEffect, useRef, useState } from "react";

import { Optional } from "@andrew-r-king/react-kitchen";

import { CanvasHelper, initShaders, WebGLContext } from "GL";

const useWebGL = (
	onLoad: (gl: WebGLContext) => void,
	vert?: string,
	frag?: string
): [RefObject<HTMLCanvasElement>, Optional<WebGLContext>, Optional<Error>] => {
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
					onLoad(context);
					setGL(context);
				} catch (err: any) {
					setError(err);
				}
			} else {
				setError(CanvasHelper.lastError);
			}
		}
	}, [ref.current]);

	return [ref, gl, error];
};

export { useWebGL };
