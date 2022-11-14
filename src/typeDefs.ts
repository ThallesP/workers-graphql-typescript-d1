import { gql } from "apollo-server-cloudflare";

const typeDefs = gql`
	type Organization {
		id: String!
		name: String!
		description: String!
		total_donations: Int!
	}
	type Query {
		getAllOrganizations: [Organization]!
	}

	input CreateOrganizationInput {
		name: String!
		description: String!
	}

	input DonateToOrganizationInput {
		amount: Int!
		id: String!
	}

	type Mutation {
		createOrganization(
			createOrganizationInput: CreateOrganizationInput!
		): Organization!

		donateToOrganization(
			donateToOrganizationInput: DonateToOrganizationInput!
		): String!
	}
`;

export default typeDefs;
