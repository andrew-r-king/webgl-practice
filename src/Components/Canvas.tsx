import React, { ForwardedRef, useCallback } from "react";
import styled from "styled-components";

import { Optional } from "@andrew-r-king/react-kitchen";

import { BootlegThree, CanvasMouseEvent, FlatContext, WebGLContext } from "GL";
import { BootlegTwo } from "GL/BootlegTwo";

type Props = {
	id: string;
	width: number;
	height?: number;
	error?: Optional<Error>;
	program2d?: BootlegTwo;
	program3d?: BootlegThree;
	ctx?: Optional<FlatContext>;
	gl?: Optional<WebGLContext>;
};

const evMouse = (
	ev: React.MouseEvent,
	id: string,
	gl?: Optional<WebGLContext>,
	func?: (ev: CanvasMouseEvent, gl: WebGLContext) => void
): void => {
	if (!!func && !!gl) {
		ev.preventDefault();

		const target = (document.getElementById(id) as HTMLCanvasElement)!;

		let normalX = ev.clientX;
		let normalY = ev.clientY;
		const rect = target.getBoundingClientRect();

		normalX = (normalX - rect.left - target.width / 2) / (target.width / 2);
		normalY = (target.height / 2 - (normalY - rect.top)) / (target.height / 2);

		ev.target = target;
		(ev as CanvasMouseEvent).normalX = normalX;
		(ev as CanvasMouseEvent).normalY = normalY;

		func(ev as CanvasMouseEvent, gl);
	}
};

const Canvas = React.forwardRef(
	({ id, error, width, height, program3d, gl }: Props, ref: ForwardedRef<HTMLCanvasElement>) => {
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
				{...(!!program3d
					? {
							onMouseDown: (ev) => evMouse(ev, id, gl, program3d.onMouseDown),
							onMouseUp: (ev) => evMouse(ev, id, gl, program3d.onMouseUp),
							onMouseMove: (ev) => evMouse(ev, id, gl, program3d.onMouseMove),
					  }
					: undefined)}
			>
				This browser does not support the {'"'}canvas{'"'} HTML5 tag.
			</Styles>
		);
	}
);

export { Canvas };

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
