import { Optional } from "@andrew-r-king/react-kitchen";

export type FlatContext = CanvasRenderingContext2D;
export type WebGLContext = WebGL2RenderingContext;

const create2DContextImpl = (canvas: HTMLCanvasElement, attributes?: CanvasRenderingContext2DSettings) => {
	const name: string = "2d";

	let context: Optional<CanvasRenderingContext2D> = canvas.getContext(name, attributes) as any;
	if (!!context) {
		console.log(`Using context: ${name}`);
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
			console.log(`Using context: ${name}`);
			break;
		}
	}

	return context;
};

class CanvasHelper {
	static lastError: Optional<string> = null;

	static create2DContext = (canvas: HTMLCanvasElement, attributes?: CanvasRenderingContext2DSettings) => {
		try {
			return create2DContextImpl(canvas, attributes);
		} catch (err: any) {
			this.lastError = err.message ?? "Unkown error setting up WebGL";
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
			this.lastError = err.message ?? "Unkown error setting up WebGL";
			console.error(err);
			return null;
		}
	};
}

export { CanvasHelper };
