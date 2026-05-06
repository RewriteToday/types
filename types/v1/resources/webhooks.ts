import type { Snowflake } from './globals';

/** https://docs.rewritetoday.com/en/api/openapi-webhooks.json */
export enum WebhookEventType {
	SMSOTP = 'sms.otp',
	MessageSent = 'message.sent',
	MessageBatch = 'message.batch',
	MessageQueued = 'message.queued',
	MessageFailed = 'message.failed',
	MessageCanceled = 'message.canceled',
	MessageDelivered = 'message.delivered',
	MessageReceived = 'message.received',
	MessageScheduled = 'message.scheduled',
}

/** Event selector accepted by webhook management endpoints. */
export type WebhookEventSelection = WebhookEventType;

/** Delivery result recorded by Rewrite for one webhook attempt. */
export enum WebhookDeliveryStatus {
	Failed = 'FAILED',
	Success = 'SUCCESS',
}

/** Optional delivery tuning stored with a webhook. */
export interface APIWebhookDelivery {
	timeout: number;
	retries: number;
}

/** https://docs.rewritetoday.com/en/api/openapi-webhooks.json */
export interface APIWebhook {
	id: Snowflake;
	name: string | null;
	events: WebhookEventSelection[];
	isEnabled: boolean;
	sandbox: boolean;
	endpoint: string;
	retries: number;
	timeout: number;
	lastDeliveryAt: string | null;
	createdAt: string;
}

/** Webhook payload returned when the secret is available. */
export interface APIWebhookWithSecret extends APIWebhook {
	secret: string;
}

/** Summary payload used by list endpoints. */
export type APIWebhookSummary = APIWebhook;
