import type { Snowflake } from './globals';

export interface APIAPIKey {
	/** API key ID in {@link Snowflake} format. */
	id: Snowflake;

	/** Display name of the API key. */
	name: string;

	/** Project ID in {@link Snowflake} format. */
	projectId: Snowflake;

	/** Allowed scopes for this key. */
	scopes: APIKeyScope[];
}

export enum APIKeyScope {
	/** Grants every available permission. */
	Wildcard = '*',

	/** Allows reading project details. */
	ReadProject = 'project:read',

	/** Allows updating project details. */
	WriteProject = 'project:write',

	/** Allows reading API key metadata. */
	ReadAPIKeys = 'project:api_key:read',

	/** Allows creating and editing templates. */
	WriteTemplate = 'project:template:write',

	/** Allows listing and viewing templates. */
	ReadTemplates = 'project:template:read',

	/** Allows reading payment information. */
	ReadPayments = 'project:payment:read',

	/** Allows listing and viewing webhooks. */
	ReadWebhooks = 'project:webhook:read',

	/** Allows creating and editing webhooks. */
	WriteWebhooks = 'project:webhook:write',
}
