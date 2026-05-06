import type { MetadataValue, Snowflake } from './globals';

/** Request source recorded by Rewrite logs. */
export enum RequestLogSource {
	API = 'API',
	Dashboard = 'Dashboard',
}

/** https://docs.rewritetoday.com/en/api/openapi-logs.json */
export interface APIRequestLogSummary {
	/** Request log identifier returned by Rewrite. */
	id: Snowflake;

	/** HTTP method used for the request. */
	method: string;

	/** Request path recorded by Rewrite. */
	endpoint: string;

	/** HTTP status code returned by Rewrite. */
	status: number;

	/** Source that originated the request. */
	source: RequestLogSource;

	/** Whether the request belongs to a sandbox flow. */
	sandbox: boolean;

	/** Timestamp when Rewrite recorded the request. */
	createdAt: string;
}

/** https://docs.rewritetoday.com/en/api/openapi-logs.json */
export interface APIRequestLog extends APIRequestLogSummary {
	/** Requester IP address, when available. */
	ip: string | null;

	/** Project identifier associated with the log, when available. */
	projectId: Snowflake | null;

	/** API key identifier associated with the log, when available. */
	apiKeyId: Snowflake | null;

	/** Serialized request body recorded by Rewrite. */
	requestBody:
		| MetadataValue
		| { [key: string]: MetadataValue }
		| MetadataValue[]
		| null;

	/** Serialized response body recorded by Rewrite. */
	responseBody:
		| MetadataValue
		| { [key: string]: MetadataValue }
		| MetadataValue[]
		| null;
}
