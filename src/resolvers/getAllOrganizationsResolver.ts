import { Organization } from "../entities/Organization";
import { Context } from "../types";

const getAllOrganizationsResolver = {
	Query: {
		getAllOrganizations: async (
			_source: unknown,
			args: unknown,
			{ dataSources }: Context
		): Promise<Organization[]> => {
			return dataSources.d1Organizations.findAll();
		},
	},
};

export { getAllOrganizationsResolver };
