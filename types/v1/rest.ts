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

/** `GET https://api.rewritetoday.com/v1/projects/:id/webhooks/:webhookId`. */
export type RESTGetWebhookData = APIResponse<APIWebhook>;

/** `POST https://api.rewritetoday.com/v1/projects/:id/webhooks`. */
export type RESTPostCreateWebhookData = APIResponse<APIWebhook>;

/** `POST https://api.rewritetoday.com/v1/projects/:id/webhooks`. */
export interface RESTPostCreateWebhookBody {
	/** Webhook name. */
	name: APIWebhook['name'];
	/** Destination URL for webhook events. */
	endpoint: APIWebhook['endpoint'];
	/** Subscribed events as {@link WebhookEventType}. */
	events: APIWebhook['events'];
}

/** `DELETE https://api.rewritetoday.com/v1/projects/:id/webhooks/:webhookId`. */
export type RESTDeleteWebhookData = APIResponse<never>;

/** `PATCH https://api.rewritetoday.com/v1/projects/:id/webhooks/:webhookId`. */
export type RESTPatchUpdateWebhookData = APIResponse<APIWebhook>;

/** `PATCH https://api.rewritetoday.com/v1/projects/:id/webhooks/:webhookId`. */
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

/** `GET https://api.rewritetoday.com/v1/projects/:id/webhooks`. */
export type RESTGetListWebhooksData = APIResponse<APIWebhook[]>;

/** `GET https://api.rewritetoday.com/v1/projects/:id/webhooks`. */
export type RESTGetListWebhooksQueryParams = RESTCursorOptions;

/** `GET https://api.rewritetoday.com/v1/projects/:id/templates`. */
export type RESTGetListTemplatesData = APIResponse<APITemplate[]>;

/** `GET https://api.rewritetoday.com/v1/projects/:id/templates`. */
export type RESTGetListTemplatesQueryParams = RESTCursorOptions;

/** `POST https://api.rewritetoday.com/v1/projects/:id/templates`. */
export type RESTPostCreateTemplateData = APIResponse<APITemplate>;

/** `POST https://api.rewritetoday.com/v1/projects/:id/templates`. */
export interface RESTPostCreateTemplateBody {
	/** Template name. */
	name: APITemplate['name'];

	/** Template variables from {@link APITemplate}. */
	variables: APITemplate['variables'];
}

/** `PATCH https://api.rewritetoday.com/v1/projects/:id/templates/:templateId`. */
export type RESTPatchUpdateTemplateData = APIResponse<APITemplate>;

/** `PATCH https://api.rewritetoday.com/v1/projects/:id/templates/:templateId`. */
export interface RESTPatchUpdateTemplateBody {
	/** Template name. */
	name: APITemplate['name'];

	/** Template variables from {@link APITemplate}. */
	variables: APITemplate['variables'];
}

/** `DELETE https://api.rewritetoday.com/v1/projects/:id/templates/:templateId`. */
export type RESTDeleteTemplateData = APIResponse<never>;

/** `GET https://api.rewritetoday.com/v1/projects/:id/templates/:templateId`. */
export type RESTGetTemplateData = APIResponse<APITemplate>;

/** `GET https://api.rewritetoday.com/v1/projects/:id/api-keys`. */
export type RESTGetListAPIKeysData = APIResponse<APIAPIKey[]>;

/** `GET https://api.rewritetoday.com/v1/projects/:id/api-keys`. */
export type RESTGetListAPIKeysQueryParams = RESTCursorOptions;

/** `POST https://api.rewritetoday.com/v1/projects/:id/api-keys`. */
export type RESTPostCreateAPIKeyData = APIResponse<APIAPIKey>;

/** `POST https://api.rewritetoday.com/v1/projects/:id/api-keys`. */
export interface RESTPostCreateAPIKeyBody {
	/** API key name. */
	name: APIAPIKey['name'];

	/** API key scopes from {@link APIAPIKey}. */
	scopes: APIAPIKey['scopes'];
}

/** `DELETE https://api.rewritetoday.com/v1/projects/:id/api-keys/:apiKeyId`. */
export type RESTDeleteAPIKeyData = APIResponse<never>;

/** `POST https://api.rewritetoday.com/v1/projects`. */
export type RESTPostCreateProjectData = APIResponse<APIProject>;

/** `POST https://api.rewritetoday.com/v1/projects`. */
export interface RESTPostCreateProjectBody {
	/** Project name. */
	name: APIProject['name'];
}

/** `PATCH https://api.rewritetoday.com/v1/projects/:id`. */
export type RESTPatchUpdateProjectData = APIResponse<APIProject>;

/** `PATCH https://api.rewritetoday.com/v1/projects/:id`. */
export interface RESTPatchUpdateProjectBody {
	/** Optional project name. */
	name?: APIProject['name'];

	/** Set to `null` to remove the current icon. */
	icon?: null;
}

/** `DELETE https://api.rewritetoday.com/v1/projects/:id`. */
export type RESTDeleteProjectData = APIResponse<never>;

/** `GET https://api.rewritetoday.com/v1/projects/:id`. */
export type RESTGetProjectData = APIResponse<APIProject>;
