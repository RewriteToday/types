import type { Snowflake } from './globals';

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
