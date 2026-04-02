import type { CountryCode, Snowflake } from './globals';
import type { MessageType } from './message';

/**
 * https://docs.rewritetoday.com/api-reference/contacts
 */
export interface APIContact {
	/** Contact ID in {@link Snowflake} format. */
	id: Snowflake;

	/** Timestamp when the contact was created. */
	createdAt: string;

	/** Timestamp when the contact was last updated. */
	updatedAt: string;

	/** Optional human-readable name for the contact. */
	name: string | null;

	/** Contact number in E.164 format. */
	phone: string;

	/** Lowercase ISO 3166-1 alpha-2 country code inferred from the number. */
	country: CountryCode;

	/** Preferred channel stored for the contact, when available. */
	channel: MessageType | null;

	/** Arbitrary contact metadata stored by Rewrite. */
	tags: Record<string, unknown>;
}
