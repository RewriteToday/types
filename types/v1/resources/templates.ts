import type { CountryCode, Metadata, Snowflake } from './globals';

/** https://docs.rewritetoday.com/en/api/openapi-templates.json */
export interface APITemplateVariable {
	name: string;
	fallback?: string;
}

/** Locale map used by template i18n payloads. */
export type APITemplateI18n = Partial<Record<CountryCode, string>>;

/** https://docs.rewritetoday.com/en/api/openapi-templates.json */
export interface APITemplate {
	id: Snowflake;
	name: string;
	content: string;
	i18n?: APITemplateI18n;
	variables: APITemplateVariable[];
	description: string | null;
	tags?: Metadata;
	createdAt: string;
}

/** Creation result returned by template create/duplicate endpoints. */
export interface APICreatedTemplate {
	id: Snowflake;
	createdAt: string;
}
