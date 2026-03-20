import type { Snowflake } from './globals';

/**
 * https://docs.rewritetoday.com/api-reference/otp
 */
export interface APIOTPMessage {
	/** OTP message in {@link Snowflake} format. */
	id: Snowflake;

	/** Destination number used for the OTP. */
	to: string;

	/** Brand prefix included in the OTP SMS. */
	prefix: string;

	/** Timestamp when Rewrite accepted the OTP request. */
	createdAt: string;

	/** Timestamp when the OTP becomes invalid. */
	expiresAt: string;
}
