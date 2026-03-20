import type { CountryCode, Snowflake } from './globals';

/**
 * https://docs.rewritetoday.com/api-reference/messages
 */
export interface APIMessage {
	/** Message ID in {@link Snowflake} format. */
	id: Snowflake;

	/** Timestamp when Rewrite accepted the message. */
	createdAt: Snowflake;

	/** Segmentation analysis for the SMS content accepted by Rewrite. */
	analysis: APIMessageAnalysis;

	/** Destination number in E.164 format. */
	to: string;

	/** Message type stored by Rewrite. See {@link MessageType} */
	type: MessageType;

	/** Metadata attached to the message. */
	tags: APIMessageTag[];

	/** Latest delivery status known by Rewrite. See {@link MessageStatus} */
	status: MessageStatus;

	/** Country inferred from the destination number. See {@link CountryCode} */
	country: CountryCode;

	/** Final SMS content sent to the destination number. */
	content: string;

	/** Encoding used by the provider when sending the SMS. See {@link MessageEncoding} */
	encoding: MessageEncoding;

	/** Template used to render the message, when applicable. */
	templateId: Snowflake | null;

	/** Timestamp when the provider confirmed final delivery. */
	deliveredAt: string | null;

	/** Scheduled send time, when the message was delayed intentionally. */
	scheduledAt: string | null;

	/** Whether the message consumed pay-as-you-go balance instead of subscription quota. */
	isPayAsYouGo: boolean;
}

/** https://docs.rewritetoday.com/api-reference/messages */
export enum MessageEncoding {
	GMS7 = 'GMS7',
	UCS2 = 'UCS2',
}

/** https://docs.rewritetoday.com/api-reference/messages */
export enum MessageStatus {
	Sent = 'SENT',
	Queued = 'QUEUED',
	Failed = 'FAILED',
	Canceled = 'CANCELED',
	Scheduled = 'SCHEDULED',
	Delivered = 'DELIVERED',
}

/** https://docs.rewritetoday.com/api-reference/messages */
export interface APIMessageTag {
	/** Tag key attached to the message. */
	name: string;

	/** Tag value attached to the message. */
	value: string;
}

/** https://docs.rewritetoday.com/api-reference/messages */
export enum MessageType {
	SMS = 'SMS',
	OTP = 'OTP',
}

/**
 * https://docs.rewritetoday.com/api-reference/messages
 */
export interface APIMessageAnalysis {
	/** Total character count in the rendered SMS content. */
	characters: number;

	/** Encoding detected for the rendered SMS content. */
	encoding: MessageAnalysisEncoding;

	/** Segments result. */
	segments: {
		/** Number of SMS segments required to send the message. */
		count: number;

		/** Maximum characters allowed when the message fits in a single SMS. */
		single: number;

		/** Maximum characters allowed per segment in multipart SMS. */
		concat: number;

		/** Why Rewrite selected the reported segmentation result. */
		reason: MessageAnalysisReason;
	};
}

/**
 * https://docs.rewritetoday.com/api-reference/messages
 */
export enum MessageAnalysisReason {
	FitsSingleSegment = 'fits',
	SmartEncodingApplied = 'smart',

	ExceedsSingleSegmentLimit = 'singleLimit',
	ContainsNonGsm7Characters = 'nonGsm7',
}

/**
 * https://docs.rewritetoday.com/api-reference/messages
 */
export enum MessageAnalysisEncoding {
	GSM7 = 'gsm7',
	UCS2 = 'ucs2',
}
