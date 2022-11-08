import { v4 as uuidV4 } from "uuid";

interface IOrganizationProps {
	id?: string;

	name: string;

	description: string;

	total_donations?: number;
}

export class Organization {
	id: string;

	name: string;

	description: string;

	total_donations: number;

	constructor({ description, name, id, total_donations }: IOrganizationProps) {
		Object.assign(this, {
			description,
			name,
			id: id || uuidV4(),
			total_donations: total_donations || 0,
		});
	}
}
