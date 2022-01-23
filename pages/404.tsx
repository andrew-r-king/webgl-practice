import { GetStaticPropsContext } from "next";

import { Page, Container } from "Components";
import { getPageRoutes } from "Server/GetPageRoutes";
import { ResultsGetPageRoutes } from "Server/ResultTypes";

type Props = ResultsGetPageRoutes;

const NotFoundPage = (props: Props) => {
	return (
		<Page title="404" {...props}>
			<Container>
				<p>Page not found...</p>
			</Container>
		</Page>
	);
};

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
	const props = await getPageRoutes();
	return {
		props: {
			...props,
		},
	};
};

export default NotFoundPage;
