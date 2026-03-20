import type { CountryCode, Snowflake } from './globals';

/**
 * https://docs.rewritetoday.com/api-reference/templates
 */
export interface APITemplate {
	/** Template ID in {@link Snowflake} format. */
	id: Snowflake;

	/** Template name. */
	name: string;

	/** Project ID in {@link Snowflake} format. */
	projectId: Snowflake;

	/** Default SMS content stored for the template. */
	content: string;

	/** Human-readable description saved with the template (1-72 max.). */
	description?: string;

	/** Locale-specific overrides available for the template. */
	i18n: Partial<Record<CountryCode, string>>;

	/** Template variables as {@link APITemplateVariable}. */
	variables: APITemplateVariable[];

	/** Timestamp when the template was created. */
	createdAt: string;
}

/**
 * https://docs.rewritetoday.com/api-reference/templates
 */
export interface APITemplateVariable {
	/** Variable name. */
	name: string;

	/** Optional default value. */
	fallback?: string;
}
