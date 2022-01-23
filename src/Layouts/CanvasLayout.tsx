import React from "react";

import { Page } from "Components";

type Props = {
	title: string;
};

const CanvasLayout = ({ title }: Props) => {
	return <Page title={title}>Hello world!</Page>;
};

export { CanvasLayout };
