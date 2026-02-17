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
	limit?: number;
	after?: Snowflake;
	before?: Snowflake;
}

export type APIResponse<Data> =
	| {
			ok: true;
			data: Data;
	  }
	| {
			ok: false;
			// TODO: Type this later
			code: string;
			message: string;
			errors?: {
				message: string;
				detailed?: object;
			};
	  };

export type RESTGetWebhookData = APIResponse<APIWebhook>;

export type RESTPostCreateWebhookData = APIResponse<APIWebhook>;

export type RESTPostCreateWebhookBody = Pick<
	APIWebhook,
	'name' | 'endpoint' | 'events'
>;

export type RESTDeleteWebhookData = APIResponse<never>;

export type RESTPatchUpdateWebhookData = APIResponse<APIWebhook>;

export interface RESTPatchUpdateWebhookBody
	extends Partial<Pick<APIWebhook, 'name' | 'endpoint' | 'events'>> {
	status?: WebhookStatus;
}

export type RESTGetListWebhooksData = APIResponse<APIWebhook[]>;

export type RESTGetListWebhooksQueryParams = RESTCursorOptions;

export type RESTGetListTemplatesData = APIResponse<APITemplate[]>;

export type RESTGetListTemplatesQueryParams = RESTCursorOptions;

export type RESTPostCreateTemplateData = APIResponse<APITemplate>;

export type RESTPostCreateTemplateBody = Pick<
	APITemplate,
	'name' | 'variables'
>;

export type RESTPatchUpdateTemplateData = APIResponse<APITemplate>;

export type RESTPatchUpdateTemplateBody = Pick<
	APITemplate,
	'name' | 'variables'
>;

export type RESTDeleteTemplateData = APIResponse<never>;

export type RESTGetTemplateData = APIResponse<APITemplate>;

export type RESTGetListAPIKeysData = APIResponse<APIAPIKey[]>;

export type RESTGetListAPIKeysQueryParams = RESTCursorOptions;

export type RESTPostCreateAPIKeyData = APIResponse<APIAPIKey>;

export type RESTPostCreateAPIKeyBody = Pick<APIAPIKey, 'name' | 'scopes'>;

export type RESTDeleteAPIKeyData = APIResponse<never>;

export type RESTPostCreateProjectData = APIResponse<APIProject>;

export type RESTPostCreateProjectBody = Pick<APIProject, 'name'>;

export type RESTPatchUpdateProjectData = APIResponse<APIProject>;

export interface RESTPatchUpdateProjectBody
	extends Partial<Pick<APIProject, 'name'>> {
	icon?: null;
}

export type RESTDeleteProjectData = APIResponse<never>;

export type RESTGetProjectData = APIResponse<APIProject>;
