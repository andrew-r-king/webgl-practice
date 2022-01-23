import { GetStaticPropsContext } from "next";
import path from "path";
import React from "react";

import { Page } from "Components";
import { getPageRoutes } from "Server/GetPageRoutes";
import { recursiveDirectorySearch } from "Server/RecursiveDirectorySearch";
import { ResultsGetPageRoutes } from "Server/ResultTypes";

type StaticProps = ResultsGetPageRoutes & {
	slug: string;
};

const dpages = path.join("src", "Layouts");

const DynamicPage = ({ slug, paths }: StaticProps) => {
	const ComponentImport = require(`Layouts/${slug}`);
	const title = ComponentImport.title ?? "Untitled";
	return (
		<Page {...{ title, paths }}>
			<ComponentImport.default />
		</Page>
	);
};

export const getStaticPaths = async () => {
	try {
		const pathsRaw = await recursiveDirectorySearch(dpages, ["tsx"]);
		const paths = pathsRaw.reduce<string[]>((acc, inPath, i, arr) => {
			let result: string = inPath.substring(0, inPath.lastIndexOf("."));
			result = result.slice(dpages.length + 1);
			if (result.endsWith("/index")) {
				result = result.slice(0, -6);

				if (result.length === 0) result = "/";
			}

			acc.push(result);
			return acc;
		}, []);
		// console.log(paths);

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

	// console.log(ctx.params);

	// const { slug: slugRaw } = ctx.params;
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
