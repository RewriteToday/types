import type { Snowflake } from './globals';
import type { WebhookEventType } from './webhooks';

/** Compact cross-project delivery record returned by Rewrite. */
export interface APICompactDelivery {
	id: Snowflake;
	url: string;
	code: number | null;
	webhookId: Snowflake | null;
	messageId: Snowflake | null;
	sandbox: boolean;
	createdAt: string;
}

/** Detailed delivery summary returned by Rewrite. */
export interface APIDeliverySummary {
	id: Snowflake;
	url: string;
	type: WebhookEventType;
	code: number | null;
	error: string | null;
	status: import('./webhooks').WebhookDeliveryStatus;
	attempt: number;
	latency: number | null;
	retryAt: string | null;
	createdAt: string;
	messageId: Snowflake | null;
	sandbox: boolean;
}
