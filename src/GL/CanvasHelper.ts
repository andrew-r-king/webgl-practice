import { Optional } from "@andrew-r-king/react-kitchen";

const glErrors = {
	programNotFound: (): Error => {
		return new Error("Critical: GL Shader program not found");
	},
	invalidAttribLocation: (): Error => {
		return new Error("Error: Invalid attribute location");
	},
};

const checkError = (gl: WebGLContext, result: number, funcName?: string): Optional<Error> => {
	if (result > 0) {
		const glErr = gl.getError();
		if (glErr !== gl.NO_ERROR) {
			const errorEntries = {
				[gl.NO_ERROR]: "NO_ERROR",
				[gl.INVALID_ENUM]: "INVALID_ENUM",
				[gl.INVALID_VALUE]: "INVALID_VALUE",
				[gl.INVALID_OPERATION]: "INVALID_OPERATION",
				[gl.INVALID_FRAMEBUFFER_OPERATION]: "INVALID_FRAMEBUFFER_OPERATION",
				[gl.OUT_OF_MEMORY]: "OUT_OF_MEMORY",
				[gl.CONTEXT_LOST_WEBGL]: "CONTEXT_LOST_WEBGL",
			};
			if (!!errorEntries[result]) {
				const errName = errorEntries[result];
				if (!!funcName) {
					return new Error(`Error: WebGL getError() from method '${funcName}' returned with ${errName}`);
				} else {
					return new Error(`Error: WebGL getError() returned with ${errName}`);
				}
			}
		}
	} else if (result < 0) {
		if (!!funcName) {
			return new Error(`Error: method '${funcName}' returned < 0`);
		} else {
			return new Error("Error: method returned < 0");
		}
	}

	return null;
};

export type FlatContext = CanvasRenderingContext2D;
export type WebGLContext = WebGL2RenderingContext & {
	errors: typeof glErrors;
	check: (func: (...args: any[]) => number, ...args: any[]) => number;
	program?: WebGLProgram;
};

const create2DContextImpl = (canvas: HTMLCanvasElement, attributes?: CanvasRenderingContext2DSettings) => {
	const name: string = "2d";

	let context: Optional<CanvasRenderingContext2D> = canvas.getContext(name, attributes) as any;
	if (!!context) {
		// console.log(`Using context: ${name}`);
	}

	return context;
};

const create3DContextImpl = (canvas: HTMLCanvasElement, attributes: any) => {
	const contextNames: string[] = ["webgl2", "webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];

	let context: Optional<WebGLContext> = null;
	for (const name of contextNames) {
		try {
			context = canvas.getContext(name, attributes) as any;
		} catch {}

		if (!!context) {
			context.check = function (func: (...args: any[]) => number, ...args: any[]) {
				const result = func.call(this, ...args);
				const error = checkError(context!, result, func.name);
				if (!!error) {
					throw error;
				}
				return result;
			};
			context.errors = glErrors;
			// console.log(`Using context: ${name}`);
			break;
		}
	}

	return context;
};

class CanvasHelper {
	static lastError: Optional<Error> = null;

	static create2DContext = (canvas: HTMLCanvasElement, attributes?: CanvasRenderingContext2DSettings) => {
		try {
			return create2DContextImpl(canvas, attributes);
		} catch (err: any) {
			this.lastError = {
				...err,
				message: err.message ?? "Unkown error setting up WebGL",
			};
			console.error(err);
			return null;
		}
	};

	static create3DContext = (canvas: HTMLCanvasElement, attributes: any = null): Optional<WebGLContext> => {
		try {
			if (canvas.addEventListener) {
				canvas.addEventListener(
					"webglcontextcreationerror",
					(ev: any) => {
						throw Error(`WebGL context creation failed: ${ev.statusMessage ?? "Uknown error"}`);
					},
					false
				);
			}
			let context = create3DContextImpl(canvas, attributes);
			if (context === null) {
				throw Error("Could not create WebGL context");
			}
			return context;
		} catch (err: any) {
			this.lastError = {
				...err,
				message: err.message ?? "Unkown error setting up WebGL",
			};
			console.error(err);
			return null;
		}
	};
}

export { CanvasHelper };
