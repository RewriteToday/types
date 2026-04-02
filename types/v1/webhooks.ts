import type { CountryCode, Snowflake } from './resources/globals';
import type {
	APIMessageAnalysis,
	APIMessageTag,
	MessageError,
	MessageStatus,
	MessageType,
} from './resources/message';
import { WebhookEventType } from './resources/webhooks';

export interface WebhookBase<
	Type extends WebhookEventType,
	Data extends object,
> {
	/** Event name. See {@link WebhookEventType}. */
	type: Type;

	/** The data of the event. */
	data: Data & {
		/** The ID of the project that sent the OTP message. See {@link Snowflake}. */
		projectId: Snowflake;
	};

	/** Webhook event identifier. See {@link Snowflake}. */
	id: Snowflake;

	/** Timestamp when Rewrite sent the event. */
	createdAt: string;
}

export interface WebhookOTPMetadata {
	/** Prefix included in the OTP SMS. */
	prefix: string;

	/** Timestamp when the OTP expires. */
	expiresAt: string;

	/** Minutes until the OTP expires. */
	expiresIn: number;
}

export interface WebhookMessagePayload {
	/** Message identifier. */
	id: Snowflake;

	/** Project identifier that emitted the event. */
	projectId: Snowflake;

	/** Destination number in E.164 format. */
	to: string;

	/** Resolved contact name or phone, when applicable. */
	contact: string | null;

	/** Linked contact identifier, when applicable. */
	contactId: Snowflake | null;

	/** Metadata attached to the message. */
	tags: APIMessageTag[];

	/** Message type. */
	type: MessageType;

	/** Latest delivery status known by Rewrite. */
	status: MessageStatus;

	/** Lowercase ISO 3166-1 alpha-2 country code inferred from the destination number. */
	country: CountryCode;

	/** Final SMS content sent to the destination number. */
	content: string;

	/** Segmentation analysis for the rendered SMS content. */
	analysis: APIMessageAnalysis;

	/** Template used to render the message, when applicable. */
	templateId: Snowflake | null;

	/** Timestamp when Rewrite scheduled the message, when applicable. */
	scheduledAt: string | null;

	/** Timestamp when Rewrite marked the message as delivered, when applicable. */
	deliveredAt: string | null;

	/** Delivery error returned for the message, when applicable. */
	error: MessageError | null;
}

/** https://docs.rewritetoday.com/en/webhooks/events/sms-otp */
export type WebhookSMSOTPEvent = WebhookBase<
	WebhookEventType.SMSOTP,
	WebhookMessagePayload & {
		/** OTP data. */
		otp: WebhookOTPMetadata;

		/** The type of the message. Always {@link MessageType.OTP} */
		type: MessageType.OTP;

		/** Latest delivery status known by Rewrite. Always {@link MessageStatus.Sent} */
		status: MessageStatus.Sent;
	}
>;

/** https://docs.rewritetoday.com/en/webhooks/events/message-sent */
export type WebhookMessageSentEvent = WebhookBase<
	WebhookEventType.MessageSent,
	WebhookMessagePayload & {
		/** The type of the message. Always {@link MessageType.SMS} */
		type: MessageType.SMS;

		/** Latest delivery status known by Rewrite. Always {@link MessageStatus.Sent} */
		status: MessageStatus.Sent;
	}
>;

/** https://docs.rewritetoday.com/en/webhooks/events/message-batch */
export type WebhookMessageBatchEvent = WebhookBase<
	WebhookEventType.MessageBatch,
	{
		/** Message ID in {@link Snowflake} format. */
		id: Snowflake;

		/**
		 * The IDs of the messages in {@link Snowflake} format that were sent.
		 *
		 * @remarks Can be longer than the original number of request items when some entries were segmented into multiple SMS parts.
		 * @see {@link https://docs.rewritetoday.com/en/webhooks/events/message-batch}
		 */
		ids: Snowflake[];
	}
>;

/** https://docs.rewritetoday.com/en/webhooks/events/message-queued */
export type WebhookMessageQueuedEvent = WebhookBase<
	WebhookEventType.MessageQueued,
	WebhookMessagePayload & {
		/** The type of the message. Always {@link MessageType.SMS} */
		type: MessageType.SMS;

		/** Latest delivery status known by Rewrite. Always {@link MessageStatus.Queued} */
		status: MessageStatus.Queued;
	}
>;

/**
 * https://docs.rewritetoday.com/en/webhooks/events/message-delivered
 *
 * @wip
 */
export type WebhookMessageDeliveredEvent = WebhookBase<
	WebhookEventType.MessageDelivered,
	WebhookMessagePayload & {
		/** The type of the message. Always {@link MessageType.SMS} */
		type: MessageType.SMS;

		/** Latest delivery status known by Rewrite. Always {@link MessageStatus.Delivered} */
		status: MessageStatus.Delivered;
	}
>;

/** https://docs.rewritetoday.com/en/webhooks/events/message-scheduled */
export type WebhookMessageScheduledEvent = WebhookBase<
	WebhookEventType.MessageScheduled,
	WebhookMessagePayload & {
		/** Scheduled send time, when the message was delayed intentionally. */
		scheduledAt: string;

		/** The type of the message. Always {@link MessageType.SMS} */
		type: MessageType.SMS;

		/** Latest delivery status known by Rewrite. Always {@link MessageStatus.Scheduled} */
		status: MessageStatus.Scheduled;
	}
>;

/** https://docs.rewritetoday.com/en/webhooks/events/message-failed */
export type WebhookMessageFailedEvent = WebhookBase<
	WebhookEventType.MessageFailed,
	WebhookMessagePayload & {
		/** Latest delivery status known by Rewrite. Always {@link MessageStatus.Failed} */
		status: MessageStatus.Failed;

		/** The error explaining why the message failed. */
		error: MessageError;
	}
>;

/** https://docs.rewritetoday.com/en/webhooks/events/message-canceled */
export type WebhookMessageCanceledEvent = WebhookBase<
	WebhookEventType.MessageCanceled,
	WebhookMessagePayload & {
		/** Scheduled send time, when the message was delayed intentionally. */
		scheduledAt: string;

		/** The type of the message. Always {@link MessageType.SMS} */
		type: MessageType.SMS;

		/** Latest delivery status known by Rewrite. Always {@link MessageStatus.Canceled} */
		status: MessageStatus.Canceled;
	}
>;

/** https://docs.rewritetoday.com/en/webhooks */
export type WebhookEvent =
	| WebhookSMSOTPEvent
	| WebhookMessageSentEvent
	| WebhookMessageBatchEvent
	| WebhookMessageQueuedEvent
	| WebhookMessageDeliveredEvent
	| WebhookMessageScheduledEvent
	| WebhookMessageFailedEvent
	| WebhookMessageCanceledEvent;

/**
 * Checks whether the event is a {@link WebhookEventType.SMSOTP} or not
 * @param event The event data received from Rewrite
 */
export function isWebhookSMSOTPEvent(event: WebhookEvent) {
	return event.type === WebhookEventType.SMSOTP;
}

/**
 * Checks whether the event is a {@link WebhookEventType.MessageSent} or not
 * @param event The event data received from Rewrite
 */
export function isWebhookMessageSentEvent(event: WebhookEvent) {
	return event.type === WebhookEventType.MessageSent;
}

/**
 * Checks whether the event is a {@link WebhookEventType.MessageBatch} or not
 * @param event The event data received from Rewrite
 */
export function isWebhookMessageBatchEvent(event: WebhookEvent) {
	return event.type === WebhookEventType.MessageBatch;
}

/**
 * Checks whether the event is a {@link WebhookEventType.MessageQueued} or not
 * @param event The event data received from Rewrite
 */
export function isWebhookMessageQueuedEvent(event: WebhookEvent) {
	return event.type === WebhookEventType.MessageQueued;
}

/**
 * Checks whether the event is a {@link WebhookEventType.MessageDelivered} or not
 * @param event The event data received from Rewrite
 */
export function isWebhookMessageDeliveredEvent(event: WebhookEvent) {
	return event.type === WebhookEventType.MessageDelivered;
}

/**
 * Checks whether the event is a {@link WebhookEventType.MessageScheduled} or not
 * @param event The event data received from Rewrite
 */
export function isWebhookMessageScheduledEvent(event: WebhookEvent) {
	return event.type === WebhookEventType.MessageScheduled;
}

/**
 * Checks whether the event is a {@link WebhookEventType.MessageFailed} or not
 * @param event The event data received from Rewrite
 */
export function isWebhookMessageFailedEvent(event: WebhookEvent) {
	return event.type === WebhookEventType.MessageFailed;
}

/**
 * Checks whether the event is a {@link WebhookEventType.MessageCanceled} or not
 * @param event The event data received from Rewrite
 */
export function isWebhookMessageCanceledEvent(event: WebhookEvent) {
	return event.type === WebhookEventType.MessageCanceled;
}
