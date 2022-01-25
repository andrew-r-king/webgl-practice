import { RefObject, useEffect, useRef, useState } from "react";

import { ClassType, Optional } from "@andrew-r-king/react-kitchen";

import { BootlegThree, CanvasHelper, initShaders, WebGLContext } from "GL";

type OutProps = {
	ref: RefObject<HTMLCanvasElement>;
	error: Optional<Error>;
	program3d: BootlegThree;
	gl: Optional<WebGLContext>;
};

function useWebGL<T extends BootlegThree>(program: ClassType<T>, vert?: string, frag?: string): OutProps {
	const ref = useRef<HTMLCanvasElement>(null);
	const [program3d] = useState<T>(new program());
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
					program3d.onLoad?.(context);
					program3d.onDraw?.(context);
					setGL(context);
				} catch (err: any) {
					setError(err);
				}
			} else {
				setError(CanvasHelper.lastError);
			}
		}
	}, [ref.current]);

	return { ref, error, program3d, gl };
}

export { useWebGL };
