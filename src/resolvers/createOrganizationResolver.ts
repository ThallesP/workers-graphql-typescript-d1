import { Organization } from "../entities/Organization";
import { Context } from "../types";

interface ICreateOrganizationInput {
	createOrganizationInput: { name: string; description: string };
}

const createOrganizationResolver = {
	Mutation: {
		createOrganization: async (
			_source: unknown,
			{ createOrganizationInput }: ICreateOrganizationInput,
			{ dataSources }: Context
		): Promise<Organization> => {
			const org = new Organization({
				description: createOrganizationInput.description,
				name: createOrganizationInput.name,
			});

			await dataSources.d1Organizations.save(org);

			return org;
		},
	},
};

export { createOrganizationResolver };
