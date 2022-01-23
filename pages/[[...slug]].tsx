import { GetStaticPropsContext } from "next";
import path from "path";
import React from "react";

import { Page } from "Components";
import { getPageRoutes } from "Server/GetPageRoutes";
import { ResultsGetPageRoutes } from "Server/ResultTypes";

type StaticProps = ResultsGetPageRoutes & {
	slug: string;
};

const DynamicPage = ({ slug, paths }: StaticProps) => {
	const ComponentImport = require(`Pages/${slug}`);
	const title = ComponentImport.title ?? "Untitled";
	const Component = ComponentImport.default ?? (() => <div>Not Found</div>);
	return (
		<Page {...{ title, paths }}>
			<Component />
		</Page>
	);
};

export const getStaticPaths = async () => {
	try {
		const { paths } = await getPageRoutes();
		return {
			fallback: false,
			paths,
		};
	} catch (err: any) {
		console.error(err?.message);
		throw err;
	}
};

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
	if (!ctx || !ctx.params) {
		throw new Error("Params not found");
	}

	const { slug: slugRaw } = ctx.params;

	let slug: string = path.join(typeof slugRaw === "string" ? slugRaw : slugRaw?.join(path.sep) ?? "");
	slug = slug.replace(/\\/g, "/");
	if (slug === ".") {
		slug = "index";
	}

	const props = await getPageRoutes();
	return {
		props: {
			slug,
			...props,
		},
	};
};

export default DynamicPage;
