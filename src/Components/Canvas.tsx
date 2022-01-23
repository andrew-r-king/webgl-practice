import React, { useEffect, useRef } from "react";
import styled from "styled-components";

type Props = {
	id: string;
	width: number;
	height?: number;
	onLoad: (canvas: HTMLCanvasElement) => void;
};

const Canvas = ({ id, width, height, onLoad }: Props) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!!canvasRef.current && id.length > 0) {
			onLoad(canvasRef.current);
		}
	}, [canvasRef.current, id]);

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
