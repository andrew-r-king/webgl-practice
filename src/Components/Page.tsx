import Head from "next/head";
import React from "react";
import styled from "styled-components";

type Props = {
	children?: React.ReactNode;
	title: string;
};

const Page = ({ title, children }: Props) => {
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
				<Container>{children}</Container>
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
	padding: 0;
	margin: 0 auto;
`;
