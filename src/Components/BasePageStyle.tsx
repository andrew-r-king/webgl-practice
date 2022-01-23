import { createGlobalStyle, css } from "styled-components";

import { globalFonts } from "./Fonts";

const styleVariables = {
	baseFontSize: 16,
};

const cssReset = css`
	*,
	::after,
	::before {
		box-sizing: border-box;
		outline: 0;
	}

	blockquote,
	body,
	dd,
	dl,
	figure,
	h1,
	h2,
	h3,
	h4,
	p {
		margin: 0;
	}

	ol[role="list"],
	ul[role="list"] {
		list-style: none;
	}

	html:focus-within {
		scroll-behavior: smooth;
	}

	body {
		min-height: 100vh;
		text-rendering: optimizeSpeed;
		line-height: 1.5;
	}

	a:not([class]) {
		text-decoration-skip-ink: auto;
	}

	img,
	picture {
		max-width: 100%;
		display: block;
	}

	button,
	input,
	select,
	textarea {
		font: inherit;
	}

	@media (prefers-reduced-motion: reduce) {
		html:focus-within {
			scroll-behavior: auto;
		}

		*,
		::after,
		::before {
			animation-duration: 0s !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0s !important;
			scroll-behavior: auto !important;
		}
	}
`;

const BaseStyle = createGlobalStyle`
    ${cssReset}

    html {
        font-size: ${styleVariables.baseFontSize}px;
        background-color: #fff;
		color: #333;
		scroll-behavior: smooth;
    }

    body {
        margin: 0;
        padding: 0;
		font-family: ${globalFonts.paragraph};
		font-size: 1.125rem;
		line-height: 1.625;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

	hr {
		border: none;
		outline: 0;
		background-color: #666;
		margin: 1rem auto;
		height: 0.0625rem;
		width: 100%;
		text-align: center;
	}

	.router-progress-bar {
		z-index: 50;
	}
`;

export { BaseStyle, styleVariables };
