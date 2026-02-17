import type { Snowflake } from './globals';

export interface APIAPIKey {
	id: Snowflake;
	name: string;
	projectId: Snowflake;
	scopes: APIKeyScope[];
}

export enum APIKeyScope {
	Wildcard = '*',

	ReadProject = 'project:read',
	WriteProject = 'project:write',

	ReadAPIKeys = 'project:api_key:read',

	WriteTemplate = 'project:template:write',
	ReadTemplates = 'project:template:read',

	ReadPayments = 'project:payment:read',

	ReadWebhooks = 'project:webhook:read',
	WriteWebhooks = 'project:webhook:write',
}
