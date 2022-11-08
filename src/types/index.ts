import { D1Organizations } from "../dataSources/D1Organizations";

export interface DataSources {
	d1Organizations: D1Organizations;
}

export interface Context {
	dataSources: DataSources;
}
