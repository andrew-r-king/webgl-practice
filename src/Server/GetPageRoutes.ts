import path from "path";

import { recursiveDirectorySearch } from "Server/RecursiveDirectorySearch";

import { ResultsGetPageRoutes } from "./ResultTypes";

const excludes: string[] = ["/index"];

const stringEndsWith = (str: string, matches: string[]): boolean => {
	let result: boolean = false;
	for (const match of matches) {
		if (str.endsWith(match)) {
			result = true;
			break;
		}
	}
	return result;
};

const getPageRoutes = async (): Promise<ResultsGetPageRoutes> => {
	try {
		const dirPages = path.join("src", "Layouts");
		const pathsRaw = await recursiveDirectorySearch(dirPages, ["tsx"]);
		const paths = pathsRaw.reduce<string[]>(
			(acc, inPath, i, arr) => {
				let result: string = inPath.substring(0, inPath.lastIndexOf("."));
				result = result.slice(dirPages.length + 1);
				if (!stringEndsWith(result, excludes)) {
					acc.push(result);
				}

				return acc;
			},
			["/"]
		);

		return {
			paths,
		};
	} catch (err: any) {
		console.error(err);
		return {
			paths: [],
		};
	}
};

export { getPageRoutes };
