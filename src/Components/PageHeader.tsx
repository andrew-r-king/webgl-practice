import React from "react";
import styled from "styled-components";

type Props = {
	name: string;
};

const PageHeader = ({ name }: Props) => {
	return <Styles>{name}</Styles>;
};

export { PageHeader };

const Styles = styled.h1`
	text-align: center;
	padding-bottom: 4rem;
`;
