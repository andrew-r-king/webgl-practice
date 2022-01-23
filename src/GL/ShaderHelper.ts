import { Optional } from "@andrew-r-king/react-kitchen";

import { WebGLContext } from "./CanvasHelper";

const loadShader = (gl: WebGLContext, type: GLenum, source: string): Optional<WebGLShader> => {
	const shader = gl.createShader(type);
	if (shader === null) {
		console.error("unable to create shader");
		return null;
	}

	// Set the shader program
	gl.shaderSource(shader, source);

	// Compile the shader
	gl.compileShader(shader);

	// Check the result of compilation
	const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if (!compiled) {
		const error = gl.getShaderInfoLog(shader);
		console.error(`Failed to compile shader: ${error}`);
		gl.deleteShader(shader);
		return null;
	}

	return shader;
};

const createProgram = (gl: WebGLContext, vshader: string, fshader: string): Optional<WebGLProgram> => {
	const vertextShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
	const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
	if (!vertextShader || !fragmentShader) {
		return null;
	}

	// Create a program object
	const program = gl.createProgram();
	if (!program) {
		return null;
	}

	gl.attachShader(program, vertextShader);
	gl.attachShader(program, fragmentShader);

	// Link the program object
	gl.linkProgram(program);

	// Check the result of linking
	const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
	if (!linked) {
		const error = gl.getProgramInfoLog(program);
		console.error(`Failed to link program: ${error}`);
		gl.deleteProgram(program);
		gl.deleteShader(fragmentShader);
		gl.deleteShader(vertextShader);
		return null;
	}

	return program;
};

const initShaders = (gl: WebGLContext, vshader: string, fshader: string): boolean => {
	const program = createProgram(gl, vshader, fshader);
	if (!program) {
		console.error(`Failed to create program`);
		return false;
	}

	gl.useProgram(program);

	return true;
};

export { initShaders };
