import React from "react";
import styled from "styled-components";

import { ResultsGetPageRoutes } from "Server/ResultTypes";

import { Link } from "./Link";

export type NavProps = ResultsGetPageRoutes;

const Navigation = ({ paths }: NavProps) => {
	const links = paths.map(({ title, route }, i) => (
		<Link href={route} key={i}>
			{title}
		</Link>
	));

	return <Styles>{links}</Styles>;
};

export { Navigation };

const Styles = styled.div`
	display: flex;
	flex-direction: column;
	padding-right: 2rem;
	width: 17.5rem;

	> a {
		display: block;
		line-height: 1.5;
	}
`;
