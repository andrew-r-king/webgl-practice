import { createGlobalStyle, css } from "styled-components";

import { globalFonts } from "Theme";
import { Theme } from "Theme/Theme";

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
	div,
	dd,
	dl,
	figure,
	h1,
	h2,
	h3,
	h4,
	p,
	a {
		line-height: 1;
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
        background-color: ${Theme.htmlBackground};
		color: ${Theme.text};
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

    a {
		display: inline-block;
		cursor: pointer;
		text-decoration: none;
		font-weight: 400;
		color: ${Theme.text};
		transition: color 0.125s linear;

		&:hover {
			color: lightblue;
		}

		&.active {
			font-weight: 600;
			color: lightblue;
		}
    }

	.router-progress-bar {
		z-index: 50;
	}
`;

export { BaseStyle, styleVariables };
