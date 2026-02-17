import type { Snowflake } from './globals';

export interface APITemplate {
	/** Template ID in {@link Snowflake} format. */
	id: Snowflake;

	/** Template name. */
	name: string;

	/** Project ID in {@link Snowflake} format. */
	projectId: Snowflake;

	/** Template variables as {@link APITemplateVariable}. */
	variables: APITemplateVariable[];
}

export interface APITemplateVariable {
	/** Variable name. */
	name: string;

	/** Optional default value. */
	fallback?: string;
}
