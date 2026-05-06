import type { Snowflake } from './globals';

/** https://docs.rewritetoday.com/en/api/openapi-otp.json */
export interface APIOTPMessage {
	id: Snowflake;
	to: string;
	prefix: string;
	createdAt: string;
	expiresAt: string;
}

/** https://docs.rewritetoday.com/en/api/openapi-otp.json */
export interface APIOTPVerification {
	id: Snowflake;
	valid: true;
	verifiedAt: string;
}
