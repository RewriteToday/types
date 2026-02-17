import type { RESTCursorOptions } from './rest';
import { createCursorQuery } from './utils';

export const API_BASE_URL = 'https://api.rewritetoday.com';

export const Routes = {
	webhooks: {
		list(id: string, options?: RESTCursorOptions) {
			return `/projects/${id}/webhooks?${createCursorQuery(options)}`;
		},
		create(id: string) {
			return `/projects/${id}/webhooks`;
		},
		update(id: string, webhookId: string) {
			return `/projects/${id}/webhooks/${webhookId}`;
		},
		delete(id: string, webhookId: string) {
			return `/projects/${id}/webhooks/${webhookId}`;
		},
		get(id: string, webhookId: string) {
			return `/projects/${id}/webhooks/${webhookId}`;
		},
	},
	templates: {
		list(id: string, options?: RESTCursorOptions) {
			return `/projects/${id}/templates?${createCursorQuery(options)}`;
		},
		create(id: string) {
			return `/projects/${id}/templates`;
		},
		update(id: string, templateId: string) {
			return `/projects/${id}/templates/${templateId}`;
		},
		delete(id: string, templateId: string) {
			return `/projects/${id}/templates/${templateId}`;
		},
		get(id: string, templateId: string) {
			return `/projects/${id}/templates/${templateId}`;
		},
	},
	apiKeys: {
		list(id: string, options?: RESTCursorOptions) {
			return `/projects/${id}/api-keys?${createCursorQuery(options)}`;
		},
		create(id: string) {
			return `/projects/${id}/api-keys`;
		},
		delete(id: string, apiKeyId: string) {
			return `/projects/${id}/api-keys/${apiKeyId}`;
		},
	},
	projects: {
		create() {
			return `/projects`;
		},
		update(id: string) {
			return `/projects/${id}`;
		},
		delete(id: string) {
			return `/projects/${id}`;
		},
		get(id: string) {
			return `/projects/${id}`;
		},
	},
};
