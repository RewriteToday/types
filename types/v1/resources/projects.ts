import type { Snowflake } from './globals';

export interface APIProject {
	id: Snowflake;
	name: string;
	ownerId: Snowflake;
	icon?: string;
}
