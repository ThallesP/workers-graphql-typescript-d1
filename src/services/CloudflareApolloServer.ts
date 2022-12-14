import { ApolloServer } from "apollo-server-cloudflare";
import { graphqlCloudflare } from "apollo-server-cloudflare/dist/cloudflareApollo";

export class CloudflareApolloServer extends ApolloServer {
	async respond(request: Request): Promise<Response> {
		const res = (await graphqlCloudflare(() =>
			this.createGraphQLServerOptions(request)
		)(request)) as Response;
		return res;
	}
}
