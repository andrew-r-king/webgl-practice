import React from "react";
import styled from "styled-components";

import { Link } from "./Link";

export type NavProps = React.PropsWithChildren<{
	paths: string[];
}>;

const Navigation = ({ paths, children }: NavProps) => {
	const links = paths.map((path, i) => {
		return (
			<Link href={path} key={i}>
				{path}
			</Link>
		);
	});

	return (
		<Styles>
			<div className="links">{links}</div>
			<div>{children}</div>
		</Styles>
	);
};

export { Navigation };

const Styles = styled.div`
	display: flex;

	> .links {
		display: flex;
		flex-direction: column;
		padding-right: 2rem;
		width: 17.5rem;

		> a {
			display: block;
			line-height: 1.5;
		}
	}
`;
