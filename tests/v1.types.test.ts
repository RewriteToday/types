import { describe, expect, expectTypeOf, test } from 'bun:test';
import {
	APIKeyScope,
	type APIProject,
	type APIResponse,
	type RESTCursorOptions,
	type RESTDeleteProjectData,
	type RESTGetListAPIKeysQueryParams,
	type RESTGetWebhookData,
	type RESTPatchUpdateProjectBody,
	type RESTPatchUpdateWebhookBody,
	type RESTPostCreateAPIKeyBody,
	type RESTPostCreateProjectBody,
	type RESTPostCreateTemplateBody,
	type RESTPostCreateWebhookBody,
	Routes,
	WebhookEventType,
	WebhookStatus,
} from '../types/v1';

describe('REST type contracts', () => {
	test('create webhook body fields', () => {
		const body: RESTPostCreateWebhookBody = {
			name: 'Webhook',
			endpoint: 'https://example.com/webhook',
			events: [WebhookEventType.SMSQueued],
		};

		expectTypeOf(body.name).toBeString();
		expectTypeOf(body.endpoint).toBeString();
		expectTypeOf(body.events).toEqualTypeOf<WebhookEventType[]>();
	});

	test('update webhook body optional fields', () => {
		const body: RESTPatchUpdateWebhookBody = {
			status: WebhookStatus.Active,
		};

		expectTypeOf(body.name).toEqualTypeOf<string | undefined>();
		expectTypeOf(body.endpoint).toEqualTypeOf<string | undefined>();
		expectTypeOf(body.events).toEqualTypeOf<WebhookEventType[] | undefined>();
		expectTypeOf(body.status).toEqualTypeOf<WebhookStatus | undefined>();
	});

	test('create template body fields', () => {
		const body: RESTPostCreateTemplateBody = {
			name: 'Welcome',
			variables: [{ name: 'firstName', fallback: 'there' }],
		};

		expectTypeOf(body.name).toBeString();
		expectTypeOf(body.variables).toEqualTypeOf<
			{ name: string; fallback?: string }[]
		>();
	});

	test('create API key body fields', () => {
		const body: RESTPostCreateAPIKeyBody = {
			name: 'Server Key',
			scopes: [APIKeyScope.ReadProject, APIKeyScope.ReadTemplates],
		};

		expectTypeOf(body.name).toBeString();
		expectTypeOf(body.scopes).toEqualTypeOf<APIKeyScope[]>();
	});

	test('project body contracts', () => {
		const createBody: RESTPostCreateProjectBody = { name: 'Core' };
		const patchBody: RESTPatchUpdateProjectBody = { icon: null };

		expectTypeOf(createBody.name).toBeString();
		expectTypeOf(patchBody.name).toEqualTypeOf<string | undefined>();
		expectTypeOf(patchBody.icon).toEqualTypeOf<null | undefined>();
	});

	test('response aliases stay aligned', () => {
		expectTypeOf<RESTGetWebhookData>().toEqualTypeOf<
			APIResponse<{
				id: `${bigint}`;
				name: string;
				endpoint: string;
				events: WebhookEventType[];
				status: WebhookStatus;
				projectId: `${bigint}`;
			}>
		>();

		expectTypeOf<RESTDeleteProjectData>().toEqualTypeOf<APIResponse<never>>();
		expectTypeOf<RESTGetListAPIKeysQueryParams>().toEqualTypeOf<RESTCursorOptions>();
	});

	test('APIResponse success and error shapes', () => {
		type ProjectResult = APIResponse<APIProject>;

		expectTypeOf<ProjectResult>().toExtend<
			| { ok: true; data: APIProject }
			| {
					ok: false;
					code: string;
					message: string;
					errors?: { message: string; detailed?: object };
			  }
		>();
	});
});

describe('Routes type usage', () => {
	test('routes return strings and keep placeholders in path', () => {
		const route = Routes.webhooks.get(':id', ':webhookId');
		const listRoute = Routes.apiKeys.list(':id');

		expect(route).toBe('/projects/:id/webhooks/:webhookId');
		expect(listRoute).toBe('/projects/:id/api-keys?limit=15');
		expectTypeOf(route).toBeString();
		expectTypeOf(listRoute).toBeString();
	});
});
