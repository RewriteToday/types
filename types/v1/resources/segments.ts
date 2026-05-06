import type { Snowflake } from './globals';

/** https://docs.rewritetoday.com/en/api/openapi-segments.json */
export interface APISegment {
	id: Snowflake;
	createdAt: string;
	name: string;
	description: string | null;
	color: string | null;
	contactsCount: number;
	sandbox: boolean;
	updatedAt: string;
}
