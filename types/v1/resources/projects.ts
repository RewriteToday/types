import type { Snowflake } from './globals';

export interface APIProject {
	/** Project ID in {@link Snowflake} format. */
	id: Snowflake;

	/** Project name. */
	name: string;

	/** Owner ID in {@link Snowflake} format. */
	ownerId: Snowflake;

	/** Optional project icon URL. */
	icon?: string;
}
