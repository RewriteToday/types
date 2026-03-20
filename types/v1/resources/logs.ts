import type { Snowflake } from './globals';
import type { WebhookEventType } from './webhooks';

/**
 * https://docs.rewritetoday.com/api-reference/logs
 */
export interface APIWebhookLog {
	/** Webhook log in {@link Snowflake} format. */
	id: Snowflake;

	/** Timestamp when Rewrite recorded the delivery attempt. */
	createdAt: string;

	/** Webhook identifier associated with the log entry. */
	webhookId: Snowflake | null;

	/** Message identifier associated with the delivery attempt, when available. */
	messageId: Snowflake | null;

	/** Webhook event type delivered in this attempt. See {@link WebhookEventType} */
	type: WebhookEventType;

	/** Transport or application error captured for the attempt. */
	error: string | null;

	/** Delivery outcome recorded by Rewrite. See {@link WebhookDeliveryStatus} */
	status: WebhookDeliveryStatus;

	/** Endpoint URL that received the delivery attempt. */
	url: string;

	/** HTTP status code returned by the destination endpoint. */
	code: number | null;

	// TODO: Create a better type
	/** Event payload delivered during this attempt. */
	payload: object;

	/** Attempt number for this delivery. */
	attempt: number;

	/**Round-trip time in milliseconds. */
	latency: number | null;

	/** Next scheduled retry time, when the attempt failed and will retry. */
	retryAt: string | null;
}

/**
 * https://docs.rewritetoday.com/api-reference/logs
 */
export enum WebhookDeliveryStatus {
	Success = 'SUCCESS',
	Failed = 'FAILED',
}
