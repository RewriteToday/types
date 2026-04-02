import type { Snowflake } from './globals';

/**
 * https://docs.rewritetoday.com/api-reference/webhooks
 */
export interface APIWebhook {
	/** Webhook ID in {@link Snowflake} format. */
	id: Snowflake;

	/** Webhook name (1-32 max). */
	name: string | null;

	/** Secret content to send in events. */
	secret: string;

	/** Destination URL for webhook events. */
	endpoint: string;

	/** Subscribed events. */
	events: WebhookEventSelection[];

	/** Current status as {@link WebhookStatus}. */
	status: WebhookStatus;

	/** Timeout in milliseconds before Rewrite aborts the attempt. */
	timeout: number;

	/** Number of retries allowed after the first failed attempt. */
	retries: number;

	/** Timestamp when the webhook endpoint was created. */
	createdAt: string;
}

/**
 * https://docs.rewritetoday.com/api-reference/webhooks
 */
export type APIWebhookSummary = Omit<APIWebhook, 'secret'>;

/**
 * https://docs.rewritetoday.com/api-reference/webhooks
 */
export interface APIWebhookDelivery {
	/** Timeout in milliseconds before Rewrite aborts the attempt. */
	timeout: number;

	/** Number of retries allowed after the first failed attempt. */
	retries: number;
}

/** Wildcard selector that subscribes a webhook to every supported event. */
export const WEBHOOK_ALL_EVENTS = '*';

/** Event selector accepted by webhook create and update endpoints. */
export type WebhookEventSelection =
	| WebhookEventType
	| typeof WEBHOOK_ALL_EVENTS;

/**
 * https://docs.rewritetoday.com/api-reference/webhooks
 */
export enum WebhookEventType {
	/** Fired when an OTP SMS was sent. */
	SMSOTP = 'sms.otp',

	/** Fired when a message was sent. */
	MessageSent = 'message.sent',

	/** Fired when a batch message was sent. */
	MessageBatch = 'message.batch',

	/** Fired when an message enters the queue. */
	MessageQueued = 'message.queued',

	/** Fired when an message reaches the destination. */
	MessageDelivered = 'message.delivered',

	/** Fired when an message is scheduled for later. */
	MessageScheduled = 'message.scheduled',

	/** Fired when an message delivery fails. */
	MessageFailed = 'message.failed',

	/** Fired when an message is canceled before delivery. */
	MessageCanceled = 'message.canceled',
}

/**
 * https://docs.rewritetoday.com/api-reference/webhooks
 */
export enum WebhookStatus {
	/** The webhook is active and receiving events. */
	Active = 'ACTIVE',

	/** The webhook is paused and not receiving events. */
	Inactive = 'INACTIVE',
}
