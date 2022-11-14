import { Context } from "../types";

interface IDonateToOrganizationInput {
	donateToOrganizationInput: {
		amount: string;
		id: string;
	};
}

const donateToOrganizationResolver = {
	Mutation: {
		donateToOrganization: async (
			_source: unknown,
			{ donateToOrganizationInput }: IDonateToOrganizationInput,
			{ dataSources }: Context
		): Promise<string> => {
			await dataSources.d1Organizations.addDonationAmount(
				donateToOrganizationInput
			);

			return donateToOrganizationInput.id;
		},
	},
};

export { donateToOrganizationResolver };
