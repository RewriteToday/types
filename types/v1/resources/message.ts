import type { CountryCode, Metadata, Snowflake } from './globals';

/** Stored message kind. */
export enum MessageType {
	SMS = 'SMS',
	OTP = 'OTP',
}

/** Stored SMS encoding. */
export enum MessageEncoding {
	GSM7 = 'GSM7',
	UCS2 = 'UCS2',
}

/** Latest message state known by Rewrite. */
export enum MessageStatus {
	Sent = 'SENT',
	Queued = 'QUEUED',
	Failed = 'FAILED',
	Canceled = 'CANCELED',
	Received = 'RECEIVED',
	Scheduled = 'SCHEDULED',
	Delivered = 'DELIVERED',
}

/** How Rewrite may handle long SMS bodies. */
export enum MessageSegmentationMode {
	Fail = 'fail',
	Trim = 'trim',
	Send = 'send',
}

/** Analysis-time encoding inferred by Rewrite. */
export enum MessageAnalysisEncoding {
	GSM7 = 'gsm7',
	UCS2 = 'ucs2',
}

/** Why Rewrite chose the reported segmentation result. */
export enum MessageAnalysisReason {
	FitsSingleSegment = 'fits',
	SmartEncodingApplied = 'smart',
	ExceedsSingleSegmentLimit = 'singleLimit',
	ContainsNonGsm7Characters = 'nonGsm7',
}

/** Error metadata embedded in message webhooks. */
export interface MessageError {
	code: string | number | null;
	message: string;
}

/** Segment sizing reported by Rewrite. */
export interface APIMessageAnalysisSegments {
	count: number;
	single: number;
	concat: number;
	reason: MessageAnalysisReason;
}

/** Segmentation analysis returned by Rewrite. */
export interface APIMessageAnalysis {
	characters: number;
	encoding: MessageAnalysisEncoding;
	segments: APIMessageAnalysisSegments;
}

/** High-level message reference returned by creation endpoints. */
export interface APIMessageRef {
	id: Snowflake;
	createdAt: string;
}

/** Message creation result returned by Rewrite. */
export interface APICreatedMessage extends APIMessageRef {
	analysis: APIMessageAnalysis;
	sandbox: boolean;
}

/** Batch message creation result returned by Rewrite. */
export interface APIBatchMessagesResult {
	ids: Snowflake[];
}

/** Persisted message representation returned by Rewrite. */
export interface APIMessage {
	id: Snowflake;
	createdAt: string;
	contact: string | null;
	contactId: Snowflake | null;
	to: string;
	from: string | null;
	type: MessageType;
	tags: Metadata;
	status: MessageStatus;
	country: CountryCode;
	content: string;
	encoding: MessageEncoding;
	templateId: Snowflake | null;
	deliveredAt: string | null;
	scheduledAt: string | null;
	sandbox: boolean;
}
