import type { CountryCode, Snowflake } from './globals';

/**
 * https://docs.rewritetoday.com/api-reference/templates
 */
export interface APITemplate {
	/** Template ID in {@link Snowflake} format. */
	id: Snowflake;

	/** Template name. */
	name: string;

	/** Default SMS content stored for the template. */
	content: string;

	/** Human-readable description saved with the template (1-72 max.). */
	description: string | null;

	/** Locale-specific overrides available for the template when requested. */
	i18n?: Partial<Record<CountryCode, string>>;

	/** Template variables as {@link APITemplateVariable}. */
	variables: APITemplateVariable[];

	/** Static tags attached to the template. */
	tags: APITemplateTag[];

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

/**
 * https://docs.rewritetoday.com/api-reference/templates
 */
export interface APITemplateTag {
	/** Tag name. */
	name: string;

	/** Tag value. */
	value: string;
}
