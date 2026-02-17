import type { Snowflake } from './globals';

export interface APIWebhook {
	/** Webhook ID in {@link Snowflake} format. */
	id: Snowflake;

	/** Webhook name. */
	name: string;

	/** Destination URL for webhook events. */
	endpoint: string;

	/** Subscribed events as {@link WebhookEventType}. */
	events: WebhookEventType[];

	/** Current status as {@link WebhookStatus}. */
	status: WebhookStatus;

	/** Project ID in {@link Snowflake} format. */
	projectId: Snowflake;
}

export enum WebhookEventType {
	/** Fired when an SMS enters the queue. */
	SMSQueued = 'sms.queued',

	/** Fired when an SMS reaches the destination. */
	SMSDelivered = 'sms.delivered',

	/** Fired when an SMS is scheduled for later. */
	SMSScheduled = 'sms.scheduled',

	/** Fired when an SMS delivery fails. */
	SMSFailed = 'sms.failed',

	/** Fired when an SMS is canceled before delivery. */
	SMSCanceled = 'sms.canceled',
}

export enum WebhookStatus {
	/** The webhook is active and receiving events. */
	Active = 'ACTIVE',

	/** The webhook is paused and not receiving events. */
	Inactive = 'INACTIVE',
}
