import { describe, expect, it } from 'bun:test';
import { Routes, WebhookDeliveryStatus } from '../types/v1';

describe('Routes', () => {
	it('builds contacts and segments routes', () => {
		expect(Routes.contacts.list()).toBe('/contacts?limit=15');
		expect(Routes.contacts.get('Ada')).toBe('/contacts/Ada');
		expect(Routes.segments.list({ limit: 20, after: '123' })).toBe(
			'/segments?limit=20&after=123',
		);
		expect(Routes.segments.contacts.attach('10')).toBe('/segments/10/contacts');
		expect(Routes.segments.contacts.detach('10', '20')).toBe(
			'/segments/10/contacts/20',
		);
	});

	it('builds updated message and template routes', () => {
		expect(Routes.messages.get('123')).toBe('/messages/123');
		expect(Routes.templates.get('welcome')).toBe('/templates/welcome');
		expect(Routes.templates.get('welcome', { withi18n: true })).toBe(
			'/templates/welcome?withi18n=true',
		);
	});

	it('builds updated webhook routes', () => {
		expect(Routes.webhooks.list({ limit: 48 })).toBe('/webhooks?limit=48');
		expect(
			Routes.webhooks.logs('42', {
				limit: 10,
				status: WebhookDeliveryStatus.Failed,
			}),
		).toBe('/webhooks/42/logs?limit=10&status=FAILED');
	});
});
