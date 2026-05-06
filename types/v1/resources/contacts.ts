import type { CountryCode, Metadata, Snowflake } from './globals';
import type { MessageType } from './message';

/** https://docs.rewritetoday.com/en/api/openapi-contacts.json */
export interface APIContact {
	/** Contact identifier returned by Rewrite. */
	id: Snowflake;

	/** Timestamp when the contact was created. */
	createdAt: string;

	/** Stored contact label, when available. */
	name: string | null;

	/** Normalized destination number stored for the contact. */
	phone: string;

	/** Country inferred from the normalized number. */
	country: CountryCode;

	/** Preferred channel stored for the contact, when configured. */
	channel: MessageType | null;

	/** Preferred locale codes stored with the contact. */
	preferredLanguages: string[];

	/** Arbitrary metadata stored with the contact. */
	tags: Metadata;

	/** Whether the contact belongs to a sandbox flow. */
	sandbox: boolean;

	/** Timestamp when the contact was last updated. */
	updatedAt: string;
}

/** Result returned by contact creation. */
export interface APICreatedContact {
	/** Contact identifier returned by Rewrite. */
	id: Snowflake;

	/** Normalized destination number stored for the contact. */
	phone: string;

	/** Country inferred from the normalized number. */
	country: CountryCode;

	/** Timestamp when the contact was created. */
	createdAt: string;

	/** Whether the contact was created under sandbox mode. */
	sandbox: boolean;
}

/** Aggregate result returned by contact batch creation/upsert. */
export interface APIContactBatchResult {
	inserted: number;
	updated: number;
	ignored: number;
	total: number;
}
