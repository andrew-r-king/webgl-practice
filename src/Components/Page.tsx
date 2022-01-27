import Head from "next/head";
import React from "react";
import styled from "styled-components";

import { Theme } from "Theme/Theme";

import { Navigation, NavProps } from "./Navigation";
import { PageHeader } from "./PageHeader";

type Props = React.PropsWithChildren<
	NavProps & {
		title: string;
	}
>;

const Page = ({ title, children, ...navProps }: Props) => {
	return (
		<>
			<Head>
				<title>{title} | WebGL</title>
				<meta
					name="viewport"
					content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
				/>
			</Head>
			<Main>
				<Container>
					<PageHeader name={title} />
					<Content>
						<Navigation {...navProps}></Navigation>
						<div>{children}</div>
					</Content>
				</Container>
			</Main>
		</>
	);
};

export { Page };

const Main = styled.main`
	display: block;
	position: absolute;
	min-height: 100vh;
	top: 0;
	right: 0;
	bottom: auto;
	left: 0;
`;

const Container = styled.div`
	display: block;
	position: relative;
	padding: 1.5rem 2rem;
	margin: 2rem auto;
	max-width: 64rem;
	background: ${Theme.background};
	border-radius: 1rem;
`;

const Content = styled.div`
	display: flex;
`;
