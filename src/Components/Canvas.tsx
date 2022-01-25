import React, { ForwardedRef } from "react";
import styled from "styled-components";

import { Optional } from "@andrew-r-king/react-kitchen";

export type CanvasMouseEvent = React.MouseEvent & {
	target?: HTMLCanvasElement;
};

type Props = {
	id: string;
	width: number;
	height?: number;
	error?: Optional<Error>;
	onMouseDown?: (ev: CanvasMouseEvent) => void;
};

const Canvas = React.forwardRef(
	({ id, error, width, height, onMouseDown }: Props, ref: ForwardedRef<HTMLCanvasElement>) => {
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
				ref={ref}
				id={id}
				width={width}
				height={height ?? width}
				onMouseDown={(ev) => {
					if (!!onMouseDown) {
						const event: CanvasMouseEvent = {
							...ev,
							target: (document.getElementById(id) as HTMLCanvasElement)!,
						};
						onMouseDown(event);
					}
				}}
			>
				This browser does not support the {'"'}canvas{'"'} HTML5 tag.
			</Styles>
		);
	}
);

type StandardCanvasProps = Omit<Props, "id" | "width"> & {
	width?: number;
};

const BasicCanvas = React.forwardRef(
	({ width, ...canvasProps }: StandardCanvasProps, ref: ForwardedRef<HTMLCanvasElement>) => {
		return <Canvas id="main-canvas" ref={ref} {...canvasProps} width={width ?? 400} />;
	}
);

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
