import type { Snowflake } from './globals';

export interface APIWebhook {
	id: Snowflake;
	name: string;
	endpoint: string;
	events: WebhookEventType[];
	status: WebhookStatus;
	projectId: Snowflake;
}

export enum WebhookEventType {
	SMSQueued = 'sms.queued',

	SMSDelivered = 'sms.delivered',

	SMSScheduled = 'sms.scheduled',

	SMSFailed = 'sms.failed',

	SMSCanceled = 'sms.canceled',
}

export enum WebhookStatus {
	Active = 'ACTIVE',
	Inactive = 'INACTIVE',
}
