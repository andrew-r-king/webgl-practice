import { Optional } from "@rewrking/react-kitchen";

import { Vec3 } from "Types";

import { WebGLContext } from "./CanvasHelper";

const SIZE: number = 3;

class VertexBuffer2D {
	private buffer: Optional<WebGLBuffer> = null;
	private vertices: Float32Array = new Float32Array([]);
	private location: number = -1;

	create = (gl: WebGLContext, location: number) => {
		this.buffer = gl.check(gl.createBuffer);
		this.location = location;
	};

	draw = (gl: WebGLContext) => {
		if (this.buffer === null) return;
		if (this.location < 0) return;
		if (this.vertices.length === 0) return;

		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

		gl.vertexAttribPointer(this.location, SIZE, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(this.location);

		gl.drawArrays(gl.POINTS, 0, this.vertices.length / SIZE);
	};

	setVertices = (value: number[]) => {
		if (value.length === 0) throw new Error("No vertices set");
		if (value.length % SIZE > 0) throw new Error("Odd number of vertices attempted");

		this.vertices = new Float32Array(value);
	};

	setVertex = (index: number, value: number) => {
		this.vertices[index] = value;
	};

	setPoint = (index: number, value: Vec3) => {
		index *= SIZE;
		const [x, y, z] = value;
		this.vertices[index] = x;
		this.vertices[index + 1] = y;
		this.vertices[index + 2] = z;
	};
}

export { VertexBuffer2D };
