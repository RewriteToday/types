import type { Snowflake } from './globals';

/**
 * https://docs.rewritetoday.com/api-reference/webhooks
 */
export interface APIWebhook {
	/** Webhook ID in {@link Snowflake} format. */
	id: Snowflake;

	/** Webhook name (1-32 max). */
	name: string;

	/** Secret content to send in events. */
	secret: string;

	/** Destination URL for webhook events. */
	endpoint: string;

	/** Subscribed events as {@link WebhookEventType}. */
	events: WebhookEventType[];

	/** Current status as {@link WebhookStatus}. */
	status: WebhookStatus;

	/** Project ID in {@link Snowflake} format. */
	projectId: Snowflake;

	/** Timestamp when the webhook endpoint was created. */
	createdAt: string;
}

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
