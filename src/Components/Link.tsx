import { default as NextLink, LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

type Props = React.PropsWithChildren<NextLinkProps> & {
	showActive?: boolean;
	onClick?: React.MouseEventHandler;
};

const Link = ({ children, onClick, ...props }: Props) => {
	const router = useRouter();

	const showActive = props.showActive ?? true;
	const targetBlank = typeof props.href === "string" && props.href.startsWith("//");
	const href = typeof props.href === "string" && props.href.split("?")[0];
	const asPath = router.asPath.split("?")[0];

	if (targetBlank && typeof props.href === "string") {
		return (
			<a href={props.href} target="_blank" rel="noreferrer">
				{children}
			</a>
		);
	} else {
		return (
			<NextLink {...props} passHref scroll={false}>
				<a className={showActive && asPath === href ? "active" : ""} onClick={onClick}>
					{children}
				</a>
			</NextLink>
		);
	}
};

export { Link };
