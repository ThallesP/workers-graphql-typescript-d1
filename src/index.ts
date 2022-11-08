import { CloudflareApolloServer } from "./services/CloudflareApolloServer";
import playground from "./services/playground";
import typeDefs from "./typeDefs";
import { D1Organizations } from "./dataSources/D1Organizations";
import { getAllOrganizationsResolver } from "./resolvers/getAllOrganizationsResolver";
import { createOrganizationResolver } from "./resolvers/createOrganizationResolver";
import { donateToOrganizationResolver } from "./resolvers/donateToOrganizationResolver";

interface Env {
	database: D1Database;
}

export default {
	async fetch(req: Request, env: Env): Promise<Response> {
		try {
			if (new URL(req.url).pathname === "/___graphql") {
				return playground(req, { baseEndpoint: "/" });
			}
			const server = new CloudflareApolloServer({
				typeDefs,
				resolvers: {
					...getAllOrganizationsResolver,
					...createOrganizationResolver,
					...donateToOrganizationResolver,
				},
				dataSources: () => ({
					d1Organizations: new D1Organizations(env.database),
				}),
			});
			server.start();
			return server.respond(req);
		} catch (e) {
			console.log(e);

			if (e instanceof Error) {
				return new Response(e.message, { status: 500 });
			}
			return new Response("Internal server error", { status: 500 });
		}
	},
};
