import type { CountryCode, Snowflake } from './resources/globals';
import type { APIWebhookLog } from './resources/logs';
import type {
	APIMessage,
	APIMessageTag,
	MessageStatus,
} from './resources/message';
import type { APIOTPMessage } from './resources/otp';
import type { APITemplate } from './resources/templates';
import type {
	APIWebhook,
	WebhookEventType,
	WebhookStatus,
} from './resources/webhooks';

/** https://docs.rewritetoday.com/en/api/pagination */
export interface RESTCursorOptions {
	/** The maximum number of items returned per page. */
	limit?: number;

	/** Forward cursor in {@link Snowflake} format. */
	after?: Snowflake;

	/** Backward cursor in {@link Snowflake} format. */
	before?: Snowflake;
}

/** https://docs.rewritetoday.com/en/api/introduction#response-conventions */
export type APIResponse<Data> =
	| {
			/** Indicates a successful response. */
			ok: true;

			/** Response payload. */
			data: Data;
	  }
	| {
			/** Indicates a failed response. */
			ok: false;
			error?: {
				/** Human-readable error message. */
				message: string;

				/** Machine-readable error code. */
				code: string;

				/** Optional detailed error (Only sent in `INVALID_JSON_BODY` code.). */
				detailed?: object;
			};
	  };

/** https://docs.rewritetoday.com/en/api/introduction#response-conventions */
export type APIResponseWithCursor<Data> =
	| {
			/** Indicates a successful response. */
			ok: true;

			/** Response payload. */
			data: Data;
			cursor: {
				/** When `true`, another page is available using the returned cursor values. */
				persist: boolean;

				/** Cursor to request the next page. */
				next?: Snowflake;

				/** Cursor to request the previous page. */
				prev?: Snowflake;
			};
	  }
	| {
			/** Indicates a failed response. */
			ok: false;
			error?: {
				/** Human-readable error message. */
				message: string;

				/** Machine-readable error code. */
				code: string;

				/** Optional detailed error (Only sent in `INVALID_JSON_BODY` code.). */
				detailed?: object;
			};
	  };

/** `GET https://api.rewritetoday.com/v1/webhooks/:id`. */
export type RESTGetWebhookData = APIResponse<APIWebhook>;

/** `POST https://api.rewritetoday.com/v1/webhooks`. */
export type RESTPostCreateWebhookData = APIResponse<
	Pick<APIWebhook, 'id' | 'secret' | 'createdAt'>
>;

/** `POST https://api.rewritetoday.com/v1/webhooks`. */
export interface RESTPostCreateWebhookBody {
	/** Webhook name. */
	name?: APIWebhook['name'];

	/** Destination URL for webhook events. */
	endpoint: APIWebhook['endpoint'];

	/** Subscribed events as {@link WebhookEventType}. */
	events: APIWebhook['events'];

	/** Secret to use in the webhook requests. */
	secret?: string;
}

/** `DELETE https://api.rewritetoday.com/v1/webhooks/:id`. */
export type RESTDeleteWebhookData = APIResponse<null>;

/** `PATCH https://api.rewritetoday.com/v1/webhooks/:id`. */
export type RESTPatchUpdateWebhookData = APIResponse<APIWebhook>;

/** `PATCH https://api.rewritetoday.com/v1/webhooks/:id`. */
export interface RESTPatchUpdateWebhookBody {
	/** Optional webhook name. */
	name?: APIWebhook['name'];

	/** Optional webhook endpoint URL. */
	endpoint?: APIWebhook['endpoint'];

	/** Optional subscribed events as {@link WebhookEventType}. */
	events?: APIWebhook['events'];

	/** Optional status as {@link WebhookStatus}. */
	status?: WebhookStatus;

	/** Optional secret to send in webhook requests. */
	secret?: string;
}

/** `GET https://api.rewritetoday.com/v1/webhooks`. */
export type RESTGetListWebhooksData = APIResponseWithCursor<APIWebhook[]>;

/** `GET https://api.rewritetoday.com/v1/webhooks`. */
export type RESTGetListWebhooksQueryParams = RESTCursorOptions;

/** `GET https://api.rewritetoday.com/v1/templates`. */
export type RESTGetListTemplatesData = APIResponseWithCursor<APITemplate[]>;

/** `GET https://api.rewritetoday.com/v1/templates`. */
export interface RESTGetListTemplatesQueryParams extends RESTCursorOptions {
	/** When `true`, include the template `i18n` map in list/detail responses. */
	with18n?: boolean;
}

/** `POST https://api.rewritetoday.com/v1/templates`. */
export type RESTPostCreateTemplateData = APIResponse<
	Pick<APITemplate, 'id' | 'createdAt'>
>;

/** `POST https://api.rewritetoday.com/v1/templates`. */
export interface RESTPostCreateTemplateBody
	extends Pick<APITemplate, 'name' | 'content' | 'variables' | 'description'> {
	/** Locale-specific overrides available for the template. */
	i18n?: Partial<Record<CountryCode, string>>;
}

/** `PATCH https://api.rewritetoday.com/v1/templates/:id`. */
export type RESTPatchUpdateTemplateData = APIResponse<null>;

/** `PATCH https://api.rewritetoday.com/v1/templates/:id`. */
export type RESTPatchUpdateTemplateBody = Omit<
	Partial<RESTPostCreateTemplateBody>,
	'name'
>;

/** `DELETE https://api.rewritetoday.com/v1/templates/:id`. */
export type RESTDeleteTemplateData = APIResponse<null>;

/** `GET https://api.rewritetoday.com/v1/templates/:id`. */
export type RESTGetTemplateData = APIResponse<APITemplate>;

/** `DELETE https://api.rewritetoday.com/v1/api-keys/:key`. */
export type RESTDeleteAPIKeyData = APIResponse<null>;

/** `GET https://api.rewritetoday.com/v1/logs/:id`. */
export type RESTGetWebhookLogData = APIResponse<APIWebhookLog>;

/** `GET https://api.rewritetoday.com/v1/webhooks/:id/logs`. */
export type RESTGetListWebhookLogsData = APIResponseWithCursor<
	Omit<APIWebhookLog, 'payload'>[]
>;

/** `GET https://api.rewritetoday.com/v1/webhooks/:id/logs`. */
export interface RESTGetListWebhookLogsQueryParams extends RESTCursorOptions {
	/** Webhook event type to include in the result set. */
	type?: WebhookEventType;

	/** Delivery status to include in the result set. */
	status?: WebhookStatus;
}

/** `POST https://api.rewritetoday.com/v1/otp` */
export interface RESTPostSendOTPMessageBody {
	/** Destination number that should receive the OTP. */
	to: string;

	/** Short brand prefix included in the OTP SMS. */
	prefix?: string;

	/** Minutes until the OTP expires (Max 15). */
	expiresIn?: number;
}

/** `POST https://api.rewritetoday.com/v1/otp` */
export type RESTPostSendOTPMessageData = APIResponse<APIOTPMessage>;

/** `POST https://api.rewritetoday.com/v1/otp/:id/verify` */
export interface RESTPostVerifyOTPCodeBody {
	/** Destination number used when the OTP was created. */
	to: string;

	/** Numeric OTP code provided by the user. */
	code: string;
}

/** `POST https://api.rewritetoday.com/v1/otp/:id/verify` */
export type RESTPostVerifyOTPCodeData = APIResponse<{
	/** OTP identifier being verified. */
	id: string;

	/** Always `true` when the OTP verification succeeds. */
	valid: boolean;

	/** Timestamp when Rewrite marked the OTP as verified. */
	verifiedAt: string | null;
}>;

/** `POST https://api.rewritetoday.com/v1/messages` */
export type RESTPostSendMessageData = APIResponse<
	Pick<APIMessage, 'id' | 'createdAt' | 'analysis'>
>;

/** `POST https://api.rewritetoday.com/v1/messages` */
export type RESTPostSendMessageBody = {
	/** Destination number in E.164 format. */
	to: string;

	/** Optional metadata stored with the message. */
	tags?: APIMessageTag[];

	/** When provided, Rewrite schedules the message for later delivery. */
	scheduledAt?: string;

	/** Optional segmentation rules for long SMS bodies. */
	segmentation?: {
		/** Maximum number of SMS segments Rewrite is allowed to send. */
		max: number;

		/** How Rewrite should behave when the message exceeds the allowed segment count. */
		mode?: 'fail' | 'trim' | 'send';

		/** When `true`, Rewrite may optimize the content to fit GSM-7 when possible. */
		smart?: boolean;
	};
} & (
	| {
			/** Rendered SMS content to send. */
			content: string;
	  }
	| {
			/** Template identifier to render before sending. */
			templateId: Snowflake;

			/** Variable values used when rendering the selected template. */
			variables: Record<string, string>;
	  }
);

/** `POST https://api.rewritetoday.com/v1/messages/batch` */
export type RESTPostSendBatchMessagesBody = RESTPostSendMessageBody[];

/** `POST https://api.rewritetoday.com/v1/messages/batch` */
export type RESTPostSendBatchMessagesData = APIResponse<{
	/** Identifiers for the messages accepted into the batch request. */
	ids: Snowflake[];
}>;

/** `POST https://api.rewritetoday.com/v1/messages/cancel` */
export type RESTPostCancelMessageData = APIResponse<null>;

/** `GET https://api.rewritetoday.com/v1/messages/:id` */
export type RESTGetMessageData = APIResponse<Omit<APIMessage, 'analysis'>>;

/** `GET https://api.rewritetoday.com/v1/messages` */
export interface RESTGetListMessagesQueryParams extends RESTCursorOptions {
	/** Filter by message status. */
	status?: MessageStatus;

	/** Lowercase ISO 3166-1 alpha-2 country code inferred from the destination number. */
	country?: CountryCode;
}

/** `GET https://api.rewritetoday.com/v1/messages` */
export type RESTGetListMessagesData = APIResponseWithCursor<
	Omit<APIMessage, 'analysis'>[]
>;
