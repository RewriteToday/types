import type { Snowflake } from './resources/globals';
import type {
	APIMessage,
	MessageStatus,
	MessageType,
} from './resources/message';
import type { APIOTPMessage } from './resources/otp';
import type { WebhookEventType } from './resources/webhooks';

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

/** https://docs.rewritetoday.com/en/webhooks/events/sms-otp */
export type WebhookSMSOTPEvent = WebhookBase<
	WebhookEventType.SMSOTP,
	Omit<APIMessage, 'type' | 'status'> & {
		/** OTP data. */
		otp: Pick<APIOTPMessage, 'prefix' | 'expiresAt'>;

		/** The type of the message. Always {@link MessageType.OTP} */
		type: MessageType.OTP;

		/** Latest delivery status known by Rewrite. Always {@link MessageStatus.Sent} */
		status: MessageStatus.Sent;
	}
>;

/** https://docs.rewritetoday.com/en/webhooks/events/message-sent */
export type WebhookMessageSentEvent = WebhookBase<
	WebhookEventType.MessageSent,
	Omit<APIMessage, 'type' | 'status'> & {
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
	Omit<APIMessage, 'type' | 'status'> & {
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
	never
>;

/** https://docs.rewritetoday.com/en/webhooks/events/message-scheduled */
export type WebhookMessageScheduledEvent = WebhookBase<
	WebhookEventType.MessageScheduled,
	Omit<APIMessage, 'type' | 'status' | 'scheduledAt'> & {
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
	Omit<APIMessage, 'status'> & {
		/** Latest delivery status known by Rewrite. Always {@link MessageStatus.Failed} */
		status: MessageStatus.Failed;

		/** The error explaining why the message failed. */
		error: {
			/** A human-readable error code. */
			code: string;

			/** Internal message error. */
			message: string;
		};
	}
>;

/** https://docs.rewritetoday.com/en/webhooks/events/message-canceled */
export type WebhookMessageCanceledEvent = WebhookBase<
	WebhookEventType.MessageCanceled,
	Omit<
		APIMessage,
		| 'type'
		| 'status'
		| ('scheduledAt' & {
				/** Scheduled send time, when the message was delayed intentionally. */
				scheduledAt: string;

				/** The type of the message. Always {@link MessageType.SMS} */
				type: MessageType.SMS;

				/** Latest delivery status known by Rewrite. Always {@link MessageStatus.Canceled} */
				status: MessageStatus.Canceled;
		  })
	>
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
