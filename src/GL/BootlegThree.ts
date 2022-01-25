import React from "react";

import { Optional } from "@andrew-r-king/react-kitchen";

import { CanvasMouseEvent } from "Components";

import { WebGLContext } from "./CanvasHelper";

export interface BootlegThree {
	onLoad?: (gl: WebGLContext) => void;
	onDraw?: (gl: WebGLContext) => void;
	onMouseDown?: (ev: CanvasMouseEvent, gl: Optional<WebGLContext>) => void;
}
