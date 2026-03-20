import type { RESTCursorOptions } from './rest';
import { createCursorQuery } from './utils';

export const API_BASE_URL = 'https://api.rewritetoday.com';

export const Routes = {
	otp: {
		/** `POST https://api.rewritetoday.com/v1/otp`. */
		send() {
			return '/otp';
		},
		/** `POST https://api.rewritetoday.com/v1/otp/:id/verify`. */
		verify(id: string) {
			return `/otp/${id}/verify`;
		},
	},
	messages: {
		/** `POST https://api.rewritetoday.com/v1/messages`. */
		send() {
			return '/messages';
		},
		/** `POST https://api.rewritetoday.com/v1/messages/batch`. */
		batch() {
			return '/messages/batch';
		},
		/** `GET https://api.rewritetoday.com/v1/messages`. */
		list() {
			return '/messages';
		},
		/** `GET https://api.rewritetoday.com/v1/messages/:id`. */
		get(id: string) {
			return `/messages/:${id}`;
		},
		/** `POST https://api.rewritetoday.com/v1/messages/:id/cancel`. */
		cancel(id: string) {
			return `/messages/${id}/cancel`;
		},
	},
	webhooks: {
		/** `GET https://api.rewritetoday.com/v1/webhooks`. */
		list(options?: RESTCursorOptions) {
			return `/webhooks?${createCursorQuery(options)}`;
		},
		/** `POST https://api.rewritetoday.com/v1/webhooks`. */
		create() {
			return '/webhooks';
		},
		/** `PATCH https://api.rewritetoday.com/v1/webhooks/:id`. */
		update(id: string) {
			return `/webhooks/${id}`;
		},
		/** `DELETE https://api.rewritetoday.com/v1/webhooks/:id`. */
		delete(id: string) {
			return `/webhooks/${id}`;
		},
		/** `GET https://api.rewritetoday.com/v1/webhooks/:id`. */
		get(id: string) {
			return `/webhooks/${id}`;
		},
		/** `GET https://api.rewritetoday.com/v1/webhooks/:id/logs`. */
		logs(id: string) {
			return `/webhooks/${id}/logs`;
		},
	},
	templates: {
		/** `GET https://api.rewritetoday.com/v1/templates`. */
		list(options?: RESTCursorOptions) {
			return `/templates?${createCursorQuery(options)}`;
		},
		/** `POST https://api.rewritetoday.com/v1/templates`. */
		create() {
			return '/templates';
		},
		/** `PATCH https://api.rewritetoday.com/v1/templates/:id`. */
		update(id: string) {
			return `/templates/${id}`;
		},
		/** `DELETE https://api.rewritetoday.com/v1/projects/:id/templates/:id`. */
		delete(id: string) {
			return `/templates/${id}`;
		},
		/** `GET https://api.rewritetoday.com/v1/projects/:id/templates/:id`. */
		get(id: string) {
			return `/templates/${id}`;
		},
	},
	apiKeys: {
		/** `DELETE https://api.rewritetoday.com/v1/api-keys/:key`. */
		delete(id: string) {
			return `/api-keys/${id}`;
		},
	},
	logs: {
		/** `GET /logs/:id`. */
		get(id: string) {
			return `/logs/${id}`;
		},
	},
};
