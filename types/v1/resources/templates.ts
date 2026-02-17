import type { Snowflake } from './globals';

export interface APITemplate {
	id: Snowflake;
	name: string;
	projectId: Snowflake;
	variables: APITemplateVariable[];
}

export interface APITemplateVariable {
	name: string;
	fallback?: string;
}
