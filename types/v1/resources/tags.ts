import type { Snowflake } from './globals';

/** https://docs.rewritetoday.com/en/api/openapi-tags.json */
export interface APITag {
	id: Snowflake;
	name: string;
	color: string | null;
	description: string | null;
	contactsCount: number;
	createdAt: string;
}

/** Result returned when a tag is created. */
export interface APICreatedTag {
	id: Snowflake;
	slug: string;
	createdAt: string;
}
