import type {
	RESTGetListContactsQueryParams,
	RESTGetListMessagesQueryParams,
	RESTGetListSegmentContactsQueryParams,
	RESTGetListSegmentsQueryParams,
	RESTGetListTemplatesQueryParams,
	RESTGetListWebhookLogsQueryParams,
	RESTGetListWebhooksQueryParams,
	RESTGetTemplateQueryParams,
} from './rest';
import { createCursorQuery, createQuery } from './utils';

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
		list(options?: RESTGetListMessagesQueryParams) {
			return `/messages?${createCursorQuery(options)}`;
		},
		/** `GET https://api.rewritetoday.com/v1/messages/:id`. */
		get(id: string) {
			return `/messages/${id}`;
		},
		/** `POST https://api.rewritetoday.com/v1/messages/:id/cancel`. */
		cancel(id: string) {
			return `/messages/${id}/cancel`;
		},
	},
	contacts: {
		/** `GET https://api.rewritetoday.com/v1/contacts`. */
		list(options?: RESTGetListContactsQueryParams) {
			return `/contacts?${createCursorQuery(options)}`;
		},
		/** `POST https://api.rewritetoday.com/v1/contacts`. */
		create() {
			return '/contacts';
		},
		/** `GET https://api.rewritetoday.com/v1/contacts/:identifier`. */
		get(identifier: string) {
			return `/contacts/${identifier}`;
		},
		/** `PATCH https://api.rewritetoday.com/v1/contacts/:id`. */
		update(id: string) {
			return `/contacts/${id}`;
		},
		/** `DELETE https://api.rewritetoday.com/v1/contacts/:id`. */
		delete(id: string) {
			return `/contacts/${id}`;
		},
	},
	segments: {
		/** `GET https://api.rewritetoday.com/v1/segments`. */
		list(options?: RESTGetListSegmentsQueryParams) {
			return `/segments?${createCursorQuery(options)}`;
		},
		/** `POST https://api.rewritetoday.com/v1/segments`. */
		create() {
			return '/segments';
		},
		/** `GET https://api.rewritetoday.com/v1/segments/:id`. */
		get(id: string) {
			return `/segments/${id}`;
		},
		/** `PATCH https://api.rewritetoday.com/v1/segments/:id`. */
		update(id: string) {
			return `/segments/${id}`;
		},
		/** `DELETE https://api.rewritetoday.com/v1/segments/:id`. */
		delete(id: string) {
			return `/segments/${id}`;
		},
		contacts: {
			/** `GET https://api.rewritetoday.com/v1/segments/:id/contacts`. */
			list(id: string, options?: RESTGetListSegmentContactsQueryParams) {
				return `/segments/${id}/contacts?${createCursorQuery(options)}`;
			},
			/** `POST https://api.rewritetoday.com/v1/segments/:id/contacts`. */
			attach(id: string) {
				return `/segments/${id}/contacts`;
			},
			/** `DELETE https://api.rewritetoday.com/v1/segments/:id/contacts/:contactId`. */
			detach(id: string, contactId: string) {
				return `/segments/${id}/contacts/${contactId}`;
			},
		},
	},
	webhooks: {
		/** `GET https://api.rewritetoday.com/v1/webhooks`. */
		list(options?: RESTGetListWebhooksQueryParams) {
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
		logs(id: string, options?: RESTGetListWebhookLogsQueryParams) {
			return `/webhooks/${id}/logs?${createCursorQuery(options)}`;
		},
	},
	templates: {
		/** `GET https://api.rewritetoday.com/v1/templates`. */
		list(options?: RESTGetListTemplatesQueryParams) {
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
		get(identifier: string, options?: RESTGetTemplateQueryParams) {
			const query = createQuery(options);

			return query
				? `/templates/${identifier}?${query}`
				: `/templates/${identifier}`;
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
