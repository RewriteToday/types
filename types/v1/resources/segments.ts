import type { Snowflake } from './globals';

/**
 * https://docs.rewritetoday.com/api-reference/segments
 */
export interface APISegment {
	/** Segment ID in {@link Snowflake} format. */
	id: Snowflake;

	/** Timestamp when the segment was created. */
	createdAt: string;

	/** Timestamp when the segment was last updated. */
	updatedAt: string;

	/** Segment name. */
	name: string;

	/** Optional HEX color associated with the segment. */
	color: string | null;

	/** Optional segment description. */
	description: string | null;

	/** Number of contacts currently attached to the segment. */
	contactsCount: number;
}
