import React from "react";
import styled from "styled-components";

type Props = React.PropsWithChildren<{}>;

const Container = ({ children }: Props) => {
	return <Styles>{children}</Styles>;
};

const Styles = styled.div`
	display: block;
	line-height: 1.5;
`;

export { Container };
