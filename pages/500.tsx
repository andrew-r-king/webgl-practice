import { GetStaticPropsContext } from "next";

import { Page, Container } from "Components";
import { getPageRoutes } from "Server/GetPageRoutes";
import { ResultsGetPageRoutes } from "Server/ResultTypes";

type Props = ResultsGetPageRoutes;

const NotFoundPage = (props: Props) => {
	return (
		<Page title="500" {...props}>
			<Container>
				<p>Internal Server Error</p>
			</Container>
		</Page>
	);
};

export const getStaticProps = async (_ctx: GetStaticPropsContext) => {
	const props = await getPageRoutes();
	return {
		props: {
			...props,
		},
	};
};

export default NotFoundPage;
