import type { Snowflake } from './resources/globals';

export interface RESTCursorOptions {
	limit?: number;
	after?: Snowflake;
	before?: Snowflake;
}
