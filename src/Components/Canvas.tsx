import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Optional } from "@andrew-r-king/react-kitchen";

import { CanvasHelper, FlatContext, initShaders, WebGLContext } from "GL";

type Props = {
	id: string;
	width: number;
	height?: number;
	onLoad2D?: (ctx: FlatContext) => void;
	onLoad3D?: (gl: WebGLContext) => void;
	vert?: string;
	frag?: string;
};

const Canvas = ({ id, width, height, onLoad2D, onLoad3D, vert, frag }: Props) => {
	const [error, setError] = useState<Optional<Error>>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!!canvasRef.current && id.length > 0) {
			if (!!onLoad3D) {
				let gl = CanvasHelper.create3DContext(canvasRef.current);
				if (!!gl) {
					try {
						if (!!vert && !!frag) {
							let program = initShaders(gl, vert, frag);
							if (!!program) {
								gl.program = program;
							}
						}
						onLoad3D(gl);
					} catch (err: any) {
						setError(err);
					}
				} else {
					setError(CanvasHelper.lastError);
				}
			} else if (!!onLoad2D) {
				let ctx = CanvasHelper.create2DContext(canvasRef.current);
				if (!!ctx) {
					onLoad2D(ctx);
				} else {
					setError(CanvasHelper.lastError);
				}
			}
		}
	}, [canvasRef.current, onLoad2D, onLoad3D, vert, frag, id]);

	if (!!error) {
		let stack = (error.stack ?? "")?.split("\n");
		for (const [i, line] of Object.entries(stack)) {
			if (line.startsWith("Canvas")) {
				stack.length = Number(i);
				break;
			}
		}
		return (
			<ErrorMessage
				style={{
					width,
					height: height ?? width,
				}}
			>
				{error.message}
				{stack.map((line, i) => (
					<span key={i}>{line}</span>
				))}
			</ErrorMessage>
		);
	}

	return (
		<Styles
			{...{
				id,
				width,
			}}
			height={height ?? width}
			ref={canvasRef}
		>
			This browser does not support the {'"'}canvas{'"'} HTML5 tag.
		</Styles>
	);
};

type StandardCanvasProps = Omit<Props, "id" | "width"> & {
	width?: number;
};

const BasicCanvas = ({ width, ...canvasProps }: StandardCanvasProps) => {
	return <Canvas id="main-canvas" {...canvasProps} width={width ?? 400} />;
};

export { Canvas, BasicCanvas };

const Styles = styled.canvas`
	display: block;
	background: #fff;
`;

const ErrorMessage = styled.div`
	display: block;
	background: #fff;
	color: red;
	padding: 2rem;
	overflow: hidden;

	> span {
		display: block;
		font-size: 0.75rem;
	}
`;
