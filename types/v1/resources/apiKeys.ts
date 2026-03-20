import type { Snowflake } from './globals';

/**
 * https://docs.rewritetoday.com/api-reference/api-keys
 */
export interface APIAPIKey {
	/** API key ID in {@link Snowflake} format. */
	id: Snowflake;

	/** Display name of the API key (1-32 max). */
	name: string;

	/** Project ID in {@link Snowflake} format. */
	projectId: Snowflake;

	/** Allowed scopes for this key. */
	scopes: APIKeyScope[];

	/** Prefix used in the API key. */
	prefix: string;

	/** Timestamp when the API key was last used (~5 minutes late). */
	lastUsedAt?: string;

	/** Optional description of the API key (1-62 max). */
	description?: string;

	/** Timestamp when Rewrite created the API key. */
	createdAt: string;
}

/**
 * https://docs.rewritetoday.com/api-reference/api-keys
 */
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
