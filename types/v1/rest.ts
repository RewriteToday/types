import type { APIAPIKey } from './resources/apiKeys';
import type { Snowflake } from './resources/globals';
import type { APIProject } from './resources/projects';
import type { APITemplate } from './resources/templates';
import {
	type APIWebhook,
	WebhookEventType,
	type WebhookStatus,
} from './resources/webhooks';

export interface RESTCursorOptions {
	/** The maximum number of items returned per page. */
	limit?: number;

	/** Forward cursor in {@link Snowflake} format. */
	after?: Snowflake;

	/** Backward cursor in {@link Snowflake} format. */
	before?: Snowflake;
}

export type APIResponse<Data> =
	| {
			/** Indicates a successful response. */
			ok: true;

			/** Response payload. */
			data: Data;
	  }
	| {
			/** Indicates a failed response. */
			ok: false;

			// TODO: Type this later
			/** Machine-readable error code. */
			code: string;

			/** Human-readable error message. */
			message: string;

			/** Optional validation details. */
			errors?: {
				/** Validation error message. */
				message: string;

				/** Additional error details. */
				detailed?: object;
			};
	  };

export type RESTGetWebhookData = APIResponse<APIWebhook>;

export type RESTPostCreateWebhookData = APIResponse<APIWebhook>;

export interface RESTPostCreateWebhookBody {
	/** Webhook name. */
	name: APIWebhook['name'];
	/** Destination URL for webhook events. */
	endpoint: APIWebhook['endpoint'];
	/** Subscribed events as {@link WebhookEventType}. */
	events: APIWebhook['events'];
}

export type RESTDeleteWebhookData = APIResponse<never>;

export type RESTPatchUpdateWebhookData = APIResponse<APIWebhook>;

export interface RESTPatchUpdateWebhookBody {
	/** Optional webhook name. */
	name?: APIWebhook['name'];

	/** Optional webhook endpoint URL. */
	endpoint?: APIWebhook['endpoint'];

	/** Optional subscribed events as {@link WebhookEventType}. */
	events?: APIWebhook['events'];

	/** Optional status as {@link WebhookStatus}. */
	status?: WebhookStatus;
}

export type RESTGetListWebhooksData = APIResponse<APIWebhook[]>;

export type RESTGetListWebhooksQueryParams = RESTCursorOptions;

export type RESTGetListTemplatesData = APIResponse<APITemplate[]>;

export type RESTGetListTemplatesQueryParams = RESTCursorOptions;

export type RESTPostCreateTemplateData = APIResponse<APITemplate>;

export interface RESTPostCreateTemplateBody {
	/** Template name. */
	name: APITemplate['name'];

	/** Template variables from {@link APITemplate}. */
	variables: APITemplate['variables'];
}

export type RESTPatchUpdateTemplateData = APIResponse<APITemplate>;

export interface RESTPatchUpdateTemplateBody {
	/** Template name. */
	name: APITemplate['name'];

	/** Template variables from {@link APITemplate}. */
	variables: APITemplate['variables'];
}

export type RESTDeleteTemplateData = APIResponse<never>;

export type RESTGetTemplateData = APIResponse<APITemplate>;

export type RESTGetListAPIKeysData = APIResponse<APIAPIKey[]>;

export type RESTGetListAPIKeysQueryParams = RESTCursorOptions;

export type RESTPostCreateAPIKeyData = APIResponse<APIAPIKey>;

export interface RESTPostCreateAPIKeyBody {
	/** API key name. */
	name: APIAPIKey['name'];

	/** API key scopes from {@link APIAPIKey}. */
	scopes: APIAPIKey['scopes'];
}

export type RESTDeleteAPIKeyData = APIResponse<never>;

export type RESTPostCreateProjectData = APIResponse<APIProject>;

export interface RESTPostCreateProjectBody {
	/** Project name. */
	name: APIProject['name'];
}

export type RESTPatchUpdateProjectData = APIResponse<APIProject>;

export interface RESTPatchUpdateProjectBody {
	/** Optional project name. */
	name?: APIProject['name'];

	/** Set to `null` to remove the current icon. */
	icon?: null;
}

export type RESTDeleteProjectData = APIResponse<never>;

export type RESTGetProjectData = APIResponse<APIProject>;
