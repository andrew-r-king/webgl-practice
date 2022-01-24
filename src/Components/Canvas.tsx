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
	const [error, setError] = useState<Optional<string>>(null);
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
						setError(err?.message ?? "Unknown error");
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
		return (
			<ErrorMessage
				style={{
					width,
					height: height ?? width,
				}}
			>
				{error}
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
`;
