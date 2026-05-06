import type { Snowflake } from './globals';

/** Shared API key scopes accepted by Rewrite. */
export enum APIKeyScope {
	Wildcard = '*',
	ReadProject = 'project:read',
	ReadAPIKeys = 'project:api_keys:read',
	WriteProject = 'project:write',
	ReadWebhooks = 'project:webhooks:read',
	WriteTemplate = 'project:templates:write',
	ReadTemplates = 'project:templates:read',
	WriteWebhooks = 'project:webhooks:write',
	WriteMessages = 'message:write',
	ReadMessages = 'message:read',
	ReadLogs = 'project:logs:read',
}

/** https://docs.rewritetoday.com/en/api/openapi-api-keys.json */
export interface APIAPIKey {
	/** API key identifier returned by Rewrite. */
	id: Snowflake;

	/** Display name shown in Rewrite surfaces. */
	name: string;

	/** Public key prefix that can be logged safely. */
	prefix: string;

	/** Scopes currently attached to the key. */
	scopes: APIKeyScope[];

	/** Optional human-readable description. */
	description: string | null;

	/** Timestamp when the key was last used, if any. */
	lastUsedAt: string | null;

	/** Timestamp when the key was created. */
	createdAt: string;
}

/** Response payload returned only once when a key is created. */
export interface APICreatedAPIKey {
	/** API key identifier returned by Rewrite. */
	id: Snowflake;

	/** Secret API key value. */
	key: string;

	/** Timestamp when the key was created. */
	createdAt: string;
}
