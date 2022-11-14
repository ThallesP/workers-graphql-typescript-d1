import { Organization } from "./../entities/Organization";
import { DataSource } from "apollo-datasource";

interface IAddDonationAmount {
	amount: string;
	id: string;
}

export class D1Organizations extends DataSource {
	constructor(private database: D1Database) {
		super();
	}

	async findAll(): Promise<Organization[]> {
		const result = await this.database
			.prepare("SELECT * FROM organizations")
			.all<Organization>();

		if (result.error || !result.results) throw result.error;

		return result.results;
	}

	async addDonationAmount({ amount, id }: IAddDonationAmount) {
		const result = await this.database
			.prepare(
				`UPDATE organizations
				SET total_donations = total_donations + ?1
				WHERE id = ?2`
			)
			.bind(amount, id)
			.run();

		if (result.error) throw result.error;
	}

	async save(org: Organization) {
		const result = await this.database
			.prepare(
				`INSERT INTO organizations (id, name, description, total_donations) VALUES(?1, ?2, ?3, ?4)`
			)
			.bind(org.id, org.name, org.description, org.total_donations)
			.run();

		if (result.error) throw result.error;

		return org;
	}
}
