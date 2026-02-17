import type { RESTCursorOptions } from './rest';
import { createCursorQuery } from './utils';

export const API_BASE_URL = 'https://api.rewritetoday.com';

export const Routes = {
	webhooks: {
		/** `GET https://api.rewritetoday.com/v1/projects/:id/webhooks`. */
		list(id: string, options?: RESTCursorOptions) {
			return `/projects/${id}/webhooks?${createCursorQuery(options)}`;
		},
		/** `POST https://api.rewritetoday.com/v1/projects/:id/webhooks`. */
		create(id: string) {
			return `/projects/${id}/webhooks`;
		},
		/** `PATCH https://api.rewritetoday.com/v1/projects/:id/webhooks/:webhookId`. */
		update(id: string, webhookId: string) {
			return `/projects/${id}/webhooks/${webhookId}`;
		},
		/** `DELETE https://api.rewritetoday.com/v1/projects/:id/webhooks/:webhookId`. */
		delete(id: string, webhookId: string) {
			return `/projects/${id}/webhooks/${webhookId}`;
		},
		/** `GET https://api.rewritetoday.com/v1/projects/:id/webhooks/:webhookId`. */
		get(id: string, webhookId: string) {
			return `/projects/${id}/webhooks/${webhookId}`;
		},
	},
	templates: {
		/** `GET https://api.rewritetoday.com/v1/projects/:id/templates`. */
		list(id: string, options?: RESTCursorOptions) {
			return `/projects/${id}/templates?${createCursorQuery(options)}`;
		},
		/** `POST https://api.rewritetoday.com/v1/projects/:id/templates`. */
		create(id: string) {
			return `/projects/${id}/templates`;
		},
		/** `PATCH https://api.rewritetoday.com/v1/projects/:id/templates/:templateId`. */
		update(id: string, templateId: string) {
			return `/projects/${id}/templates/${templateId}`;
		},
		/** `DELETE https://api.rewritetoday.com/v1/projects/:id/templates/:templateId`. */
		delete(id: string, templateId: string) {
			return `/projects/${id}/templates/${templateId}`;
		},
		/** `GET https://api.rewritetoday.com/v1/projects/:id/templates/:templateId`. */
		get(id: string, templateId: string) {
			return `/projects/${id}/templates/${templateId}`;
		},
	},
	apiKeys: {
		/** `GET https://api.rewritetoday.com/v1/projects/:id/api-keys`. */
		list(id: string, options?: RESTCursorOptions) {
			return `/projects/${id}/api-keys?${createCursorQuery(options)}`;
		},
		/** `POST https://api.rewritetoday.com/v1/projects/:id/api-keys`. */
		create(id: string) {
			return `/projects/${id}/api-keys`;
		},
		/** `DELETE https://api.rewritetoday.com/v1/projects/:id/api-keys/:apiKeyId`. */
		delete(id: string, apiKeyId: string) {
			return `/projects/${id}/api-keys/${apiKeyId}`;
		},
	},
	projects: {
		/** `POST https://api.rewritetoday.com/v1/projects`. */
		create() {
			return `/projects`;
		},
		/** `PATCH https://api.rewritetoday.com/v1/projects/:id`. */
		update(id: string) {
			return `/projects/${id}`;
		},
		/** `DELETE https://api.rewritetoday.com/v1/projects/:id`. */
		delete(id: string) {
			return `/projects/${id}`;
		},
		/** `GET https://api.rewritetoday.com/v1/projects/:id`. */
		get(id: string) {
			return `/projects/${id}`;
		},
	},
};
