import { AppProps } from "next/app";
import Router from "next/router";
import React from "react";

import ProgressBar from "@badrap/bar-of-progress";
import { Optional } from "@rewrking/react-kitchen";

import { BaseStyle } from "Components";

let progress: Optional<ProgressBar> = null;
if (progress === null) {
	progress = new ProgressBar({
		size: "0.25rem",
		color: "lightblue",
		className: "router-progress-bar",
		delay: 100,
	});

	Router.events.on("routeChangeStart", progress.start);
	Router.events.on("routeChangeComplete", progress.finish);
	Router.events.on("routeChangeError", progress.finish);
}

type Props = AppProps & {
	Component: any;
};

const Main = ({ Component, pageProps }: Props) => {
	return (
		<>
			<BaseStyle />
			<Component {...pageProps} />
		</>
	);
};

export default Main;
