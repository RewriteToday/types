import type { APIContact } from './resources/contacts';
import type { CountryCode, Snowflake } from './resources/globals';
import type {
	APIWebhookLog,
	APIWebhookLogSummary,
	WebhookDeliveryStatus,
} from './resources/logs';
import type {
	APIMessage,
	APIMessageTag,
	MessageStatus,
	MessageType,
} from './resources/message';
import type { APIOTPMessage } from './resources/otp';
import type { APISegment } from './resources/segments';
import type { APITemplate, APITemplateTag } from './resources/templates';
import type {
	APIWebhook,
	APIWebhookDelivery,
	APIWebhookSummary,
	WebhookEventSelection,
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

/** `GET https://api.rewritetoday.com/v1/contacts/:identifier`. */
export type RESTGetContactData = APIResponse<APIContact>;

/** `GET https://api.rewritetoday.com/v1/contacts`. */
export type RESTGetListContactsData = APIResponseWithCursor<APIContact[]>;

/** `GET https://api.rewritetoday.com/v1/contacts`. */
export type RESTGetListContactsQueryParams = RESTCursorOptions;

/** `POST https://api.rewritetoday.com/v1/contacts`. */
export type RESTPostCreateContactData = APIResponse<
	Pick<APIContact, 'id' | 'phone' | 'country' | 'createdAt'>
>;

/** `POST https://api.rewritetoday.com/v1/contacts`. */
export interface RESTPostCreateContactBody {
	/** Contact number in E.164 format. */
	phone: string;

	/** Optional contact name. */
	name?: string;

	/** Optional preferred channel for the contact. */
	channel?: MessageType;

	/** Arbitrary metadata stored with the contact. */
	tags?: Record<string, unknown>;
}

/** `PATCH https://api.rewritetoday.com/v1/contacts/:id`. */
export type RESTPatchUpdateContactData = APIResponse<null>;

/** `PATCH https://api.rewritetoday.com/v1/contacts/:id`. */
export type RESTPatchUpdateContactBody = Partial<RESTPostCreateContactBody>;

/** `DELETE https://api.rewritetoday.com/v1/contacts/:id`. */
export type RESTDeleteContactData = APIResponse<null>;

/** `GET https://api.rewritetoday.com/v1/segments/:id`. */
export type RESTGetSegmentData = APIResponse<APISegment>;

/** `GET https://api.rewritetoday.com/v1/segments`. */
export type RESTGetListSegmentsData = APIResponseWithCursor<APISegment[]>;

/** `GET https://api.rewritetoday.com/v1/segments`. */
export type RESTGetListSegmentsQueryParams = RESTCursorOptions;

/** `POST https://api.rewritetoday.com/v1/segments`. */
export type RESTPostCreateSegmentData = APIResponse<APISegment>;

/** `POST https://api.rewritetoday.com/v1/segments`. */
export interface RESTPostCreateSegmentBody {
	/** Segment name. */
	name: string;

	/** Optional HEX color associated with the segment. */
	color?: string | null;

	/** Optional segment description. */
	description?: string | null;
}

/** `PATCH https://api.rewritetoday.com/v1/segments/:id`. */
export type RESTPatchUpdateSegmentData = APIResponse<null>;

/** `PATCH https://api.rewritetoday.com/v1/segments/:id`. */
export type RESTPatchUpdateSegmentBody = Partial<RESTPostCreateSegmentBody>;

/** `DELETE https://api.rewritetoday.com/v1/segments/:id`. */
export type RESTDeleteSegmentData = APIResponse<null>;

/** `GET https://api.rewritetoday.com/v1/segments/:id/contacts`. */
export type RESTGetListSegmentContactsData = APIResponseWithCursor<
	APIContact[]
>;

/** `GET https://api.rewritetoday.com/v1/segments/:id/contacts`. */
export type RESTGetListSegmentContactsQueryParams = RESTCursorOptions;

/** `POST https://api.rewritetoday.com/v1/segments/:id/contacts`. */
export interface RESTPostAttachSegmentContactBody {
	/** Contact identifier to attach to the segment. */
	contactId: Snowflake;
}

/** `POST https://api.rewritetoday.com/v1/segments/:id/contacts`. */
export type RESTPostAttachSegmentContactData = APIResponse<null>;

/** `DELETE https://api.rewritetoday.com/v1/segments/:id/contacts/:contactId`. */
export type RESTDeleteDetachSegmentContactData = APIResponse<null>;

/** `GET https://api.rewritetoday.com/v1/webhooks/:id`. */
export type RESTGetWebhookData = APIResponse<APIWebhook>;

/** `POST https://api.rewritetoday.com/v1/webhooks`. */
export type RESTPostCreateWebhookData = APIResponse<
	Pick<APIWebhook, 'id' | 'secret' | 'createdAt'>
>;

/** `POST https://api.rewritetoday.com/v1/webhooks`. */
export interface RESTPostCreateWebhookBody {
	/** Optional webhook name. */
	name?: string;

	/** Destination URL for webhook events. */
	endpoint: APIWebhook['endpoint'];

	/** Subscribed webhook events. */
	events: WebhookEventSelection[];

	/** Optional secret to use in webhook deliveries. */
	secret?: string;

	/** Optional delivery overrides. */
	delivery?: Partial<APIWebhookDelivery>;
}

/** `DELETE https://api.rewritetoday.com/v1/webhooks/:id`. */
export type RESTDeleteWebhookData = APIResponse<null>;

/** `PATCH https://api.rewritetoday.com/v1/webhooks/:id`. */
export type RESTPatchUpdateWebhookData = APIResponse<null>;

/** `PATCH https://api.rewritetoday.com/v1/webhooks/:id`. */
export interface RESTPatchUpdateWebhookBody {
	/** Optional webhook name. */
	name?: string | null;

	/** Optional destination URL for webhook events. */
	endpoint?: APIWebhook['endpoint'];

	/** Optional set of subscribed webhook events. */
	events?: WebhookEventSelection[];

	/** Optional status. */
	status?: WebhookStatus;

	/** Optional secret to use in webhook deliveries. */
	secret?: string;

	/** Optional delivery overrides. */
	delivery?: Partial<APIWebhookDelivery>;
}

/** `GET https://api.rewritetoday.com/v1/webhooks`. */
export type RESTGetListWebhooksData = APIResponseWithCursor<
	APIWebhookSummary[]
>;

/** `GET https://api.rewritetoday.com/v1/webhooks`. */
export type RESTGetListWebhooksQueryParams = RESTCursorOptions;

/** `GET https://api.rewritetoday.com/v1/templates`. */
export type RESTGetListTemplatesData = APIResponseWithCursor<APITemplate[]>;

/** `GET https://api.rewritetoday.com/v1/templates`. */
export interface RESTGetListTemplatesQueryParams extends RESTCursorOptions {
	/** When `true`, include the template `i18n` map in responses. */
	withi18n?: boolean;
}

/** `GET https://api.rewritetoday.com/v1/templates/:identifier`. */
export interface RESTGetTemplateQueryParams {
	/** When `true`, include the template `i18n` map in the response. */
	withi18n?: boolean;
}

/** `POST https://api.rewritetoday.com/v1/templates`. */
export type RESTPostCreateTemplateData = APIResponse<
	Pick<APITemplate, 'id' | 'createdAt'>
>;

/** `POST https://api.rewritetoday.com/v1/templates`. */
export interface RESTPostCreateTemplateBody
	extends Pick<APITemplate, 'name' | 'content' | 'variables'> {
	/** Optional description saved with the template. */
	description?: APITemplate['description'];

	/** Optional static tags attached to the template. */
	tags?: APITemplateTag[];
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

/** `GET https://api.rewritetoday.com/v1/templates/:identifier`. */
export type RESTGetTemplateData = APIResponse<APITemplate>;

/** `DELETE https://api.rewritetoday.com/v1/api-keys/:key`. */
export type RESTDeleteAPIKeyData = APIResponse<null>;

/** `GET https://api.rewritetoday.com/v1/logs/:id`. */
export type RESTGetWebhookLogData = APIResponse<APIWebhookLog>;

/** `GET https://api.rewritetoday.com/v1/webhooks/:id/logs`. */
export type RESTGetListWebhookLogsData = APIResponseWithCursor<
	APIWebhookLogSummary[]
>;

/** `GET https://api.rewritetoday.com/v1/webhooks/:id/logs`. */
export interface RESTGetListWebhookLogsQueryParams extends RESTCursorOptions {
	/** Webhook event type to include in the result set. */
	type?: WebhookEventType;

	/** Delivery status to include in the result set. */
	status?: WebhookDeliveryStatus;
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
	valid: true;

	/** Timestamp when Rewrite marked the OTP as verified. */
	verifiedAt: string;
}>;

type RESTMessageCreateResponse = Pick<
	APIMessage,
	'id' | 'createdAt' | 'analysis'
>;

interface RESTMessageBaseBody {
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
}

interface RESTMessagePhoneTargetBody {
	/** Destination number in E.164 format. */
	to: string;

	/** Contact identifier or name target is not allowed when `to` is provided. */
	contact?: never;
}

interface RESTMessageContactTargetBody {
	/** Contact identifier or name used to resolve the destination number. */
	contact: string;

	/** Direct phone targets are not allowed when `contact` is provided. */
	to?: never;
}

interface RESTMessageContentBody {
	/** Rendered SMS content to send. */
	content: string;

	/** Template identifiers are not allowed when raw content is provided. */
	templateId?: never;

	/** Variables are not allowed when raw content is provided. */
	variables?: never;
}

interface RESTMessageTemplateBody {
	/** Template identifier to render before sending. */
	templateId: Snowflake;

	/** Variable values used when rendering the selected template. */
	variables?: Record<string, string>;

	/** Raw content is not allowed when a template is provided. */
	content?: never;
}

/** `POST https://api.rewritetoday.com/v1/messages` */
export type RESTPostSendMessageBody = RESTMessageBaseBody &
	(RESTMessagePhoneTargetBody | RESTMessageContactTargetBody) &
	(RESTMessageContentBody | RESTMessageTemplateBody);

/** `POST https://api.rewritetoday.com/v1/messages` */
export type RESTPostSendMessageData = APIResponse<RESTMessageCreateResponse>;

/** `POST https://api.rewritetoday.com/v1/messages/batch` */
export type RESTPostSendBatchMessagesBody = RESTPostSendMessageBody[];

/** `POST https://api.rewritetoday.com/v1/messages/batch` */
export type RESTPostSendBatchMessagesData = APIResponse<
	RESTMessageCreateResponse[]
>;

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
