import type {
	APIAPIKey,
	APICreatedAPIKey,
	APIKeyScope,
} from './resources/apiKeys';
import type {
	APIContact,
	APIContactBatchResult,
	APICreatedContact,
} from './resources/contacts';
import type {
	APICompactDelivery,
	APIDeliverySummary,
} from './resources/deliveries';
import type { Metadata, Snowflake } from './resources/globals';
import type { APIRequestLog, APIRequestLogSummary } from './resources/logs';
import type {
	APIBatchMessagesResult,
	APICreatedMessage,
	APIMessage,
	APIMessageAnalysis,
	MessageEncoding,
	MessageSegmentationMode,
	MessageStatus,
	MessageType,
} from './resources/message';
import type { APIOTPMessage, APIOTPVerification } from './resources/otp';
import type { APISegment } from './resources/segments';
import type { APICreatedTag, APITag } from './resources/tags';
import type {
	APICreatedTemplate,
	APITemplate,
	APITemplateI18n,
	APITemplateVariable,
} from './resources/templates';
import type {
	APIWebhook,
	APIWebhookDelivery,
	APIWebhookSummary,
	APIWebhookWithSecret,
	WebhookDeliveryStatus,
	WebhookEventSelection,
	WebhookEventType,
} from './resources/webhooks';
import type { WebhookEvent } from './webhooks';

/** https://docs.rewritetoday.com/en/api/pagination */
export interface RESTCursorOptions {
	limit?: number;
	after?: Snowflake;
	before?: Snowflake;
}

export type RESTGetListAPIKeysQueryParams = RESTCursorOptions;
export type RESTGetListWebhooksQueryParams = RESTCursorOptions;

export interface APIError {
	message: string;
	code: string;
	detailed?: object;
}

export type APIResponse<Data> =
	| {
			ok: true;
			data: Data;
	  }
	| {
			ok: false;
			error?: APIError;
	  };

export type APIResponseWithCursor<Data> =
	| {
			ok: true;
			data: Data;
			cursor: {
				persist: boolean;
				next?: Snowflake;
				prev?: Snowflake;
			};
	  }
	| {
			ok: false;
			error?: APIError;
	  };

export type APIResponseWithCursorAndCount<Data> =
	| {
			ok: true;
			data: Data;
			cursor: {
				persist: boolean;
				next?: Snowflake;
				prev?: Snowflake;
			};
			count?: number;
	  }
	| {
			ok: false;
			error?: APIError;
	  };

export interface RESTDeleteManyBody {
	ids: Snowflake[];
}

export type RESTDeleteManyData = APIResponse<Snowflake[]>;

export type RESTGetListAPIKeysData = APIResponseWithCursor<APIAPIKey[]>;
export type RESTGetAPIKeyData = APIResponse<APIAPIKey>;
export type RESTPostCreateAPIKeyData = APIResponse<APICreatedAPIKey>;
export interface RESTPostCreateAPIKeyBody {
	name: string;
	description?: string;
	scopes?: APIKeyScope[];
}
export type RESTPatchUpdateAPIKeyData = APIResponse<null>;
export interface RESTPatchUpdateAPIKeyBody {
	name?: string;
	description?: string | null;
	scopes?: APIKeyScope[];
}
export type RESTDeleteAPIKeyData = APIResponse<null>;
export type RESTDeleteAPIKeysData = RESTDeleteManyData;

export type RESTGetContactData = APIResponse<APIContact>;
export type RESTGetListContactsData = APIResponseWithCursor<APIContact[]>;
export type RESTGetListContactsQueryParams = RESTCursorOptions;
export type RESTPostCreateContactData = APIResponse<APICreatedContact>;
export interface RESTPostCreateContactBody {
	phone: string;
	name?: string;
	channel?: MessageType;
	tagIds?: Snowflake[];
	tags?: Metadata;
	preferredLanguages?: string[];
}
export type RESTPatchUpdateContactData = APIResponse<null>;
export type RESTPatchUpdateContactBody = Partial<RESTPostCreateContactBody>;
export type RESTDeleteContactData = APIResponse<null>;
export type RESTDeleteContactsData = RESTDeleteManyData;
export interface RESTPostBatchContactsBody {
	contacts: RESTPostCreateContactBody[];
	upsert?: boolean;
}
export type RESTPostBatchContactsData = APIResponse<APIContactBatchResult>;
export interface RESTPostAttachContactTagsBody {
	ids: Snowflake[];
}
export type RESTPostAttachContactTagsData = APIResponse<null>;
export type RESTDeleteDetachContactTagsBody = RESTPostAttachContactTagsBody;
export type RESTDeleteDetachContactTagsData = APIResponse<null>;

export type RESTGetSegmentData = APIResponse<APISegment>;
export type RESTGetListSegmentsData = APIResponseWithCursor<APISegment[]>;
export type RESTGetListSegmentsQueryParams = RESTCursorOptions;
export type RESTPostCreateSegmentData = APIResponse<APISegment>;
export interface RESTPostCreateSegmentBody {
	name: string;
	color?: string | null;
	description?: string | null;
}
export type RESTPatchUpdateSegmentData = APIResponse<null>;
export type RESTPatchUpdateSegmentBody = Partial<RESTPostCreateSegmentBody>;
export type RESTDeleteSegmentData = APIResponse<null>;
export type RESTDeleteSegmentsData = RESTDeleteManyData;
export type RESTGetListSegmentContactsData = APIResponseWithCursor<
	APIContact[]
>;
export type RESTGetListSegmentContactsQueryParams = RESTCursorOptions;
export interface RESTPostAttachSegmentContactBody {
	contactId: Snowflake;
}
export type RESTPostAttachSegmentContactData = APIResponse<null>;
export interface RESTPostAttachSegmentContactsBody {
	ids: Snowflake[];
}
export type RESTPostAttachSegmentContactsData = APIResponse<null>;
export interface RESTPostDetachSegmentContactsBody {
	ids: Snowflake[];
}
export type RESTPostDetachSegmentContactsData = APIResponse<null>;
export type RESTDeleteDetachSegmentContactData = APIResponse<null>;

export type RESTPostSendOTPMessageData = APIResponse<APIOTPMessage>;
export interface RESTPostSendOTPPhoneMessageBody {
	to: string;
	prefix?: string;
	expiresIn?: number;
}
export interface RESTPostSendOTPContactMessageBody {
	contact: string;
	prefix?: string;
	expiresIn?: number;
}
export type RESTPostSendOTPMessageBody =
	| RESTPostSendOTPPhoneMessageBody
	| RESTPostSendOTPContactMessageBody;
export interface RESTPostVerifyOTPCodeBody {
	to: string;
	code: string;
}
export type RESTPostVerifyOTPCodeData = APIResponse<APIOTPVerification>;

export type RESTGetListTagsData = APIResponse<APITag[]>;
export type RESTGetTagData = APIResponse<APITag>;
export type RESTPostCreateTagData = APIResponse<APICreatedTag>;
export interface RESTPostCreateTagBody {
	name: string;
	color?: string;
	description?: string;
}
export type RESTPatchUpdateTagData = APIResponse<null>;
export interface RESTPatchUpdateTagBody {
	name?: string;
	color?: string;
	description?: string;
}
export type RESTDeleteTagData = APIResponse<null>;

export type RESTGetListTemplatesData = APIResponseWithCursor<APITemplate[]>;
export interface RESTGetListTemplatesQueryParams extends RESTCursorOptions {
	withi18n?: boolean;
}
export interface RESTGetTemplateQueryParams {
	withi18n?: boolean;
}
export type RESTGetTemplateData = APIResponse<APITemplate>;
export type RESTPostCreateTemplateData = APIResponse<APICreatedTemplate>;
export interface RESTPostCreateTemplateBody {
	name: string;
	content: string;
	variables: APITemplateVariable[];
	description?: string | null;
	tags?: Metadata;
}
export type RESTPatchUpdateTemplateData = APIResponse<null>;
export interface RESTPatchUpdateTemplateBody {
	content?: string;
	variables?: APITemplateVariable[];
	description?: string | null;
	tags?: Metadata;
}
export type RESTDeleteTemplateData = APIResponse<null>;
export type RESTDeleteTemplatesData = RESTDeleteManyData;
export interface RESTPostDuplicateTemplateBody {
	name?: string;
}
export type RESTPostDuplicateTemplateData = APIResponse<APICreatedTemplate>;

export type RESTGetListWebhooksData = APIResponseWithCursor<
	APIWebhookSummary[]
>;
export type RESTGetWebhookData = APIResponse<APIWebhookWithSecret>;
export type RESTPostCreateWebhookData = APIResponse<
	Pick<APIWebhookWithSecret, 'id' | 'secret' | 'createdAt'> & {
		sandbox: boolean;
	}
>;
export interface RESTPostCreateWebhookBody {
	name?: string;
	events: WebhookEventSelection[];
	secret?: string;
	endpoint: string;
	delivery?: APIWebhookDelivery;
}
export type RESTPatchUpdateWebhookData = APIResponse<null>;
export interface RESTPatchUpdateWebhookBody {
	name?: string | null;
	events?: WebhookEventSelection[];
	secret?: string;
	endpoint?: string;
	isEnabled?: boolean;
	delivery?: APIWebhookDelivery;
}
export type RESTDeleteWebhookData = APIResponse<null>;
export type RESTDeleteWebhooksData = RESTDeleteManyData;

export type RESTGetLogData = APIResponse<APIRequestLog>;
export type RESTGetListLogsData = APIResponseWithCursor<APIRequestLogSummary[]>;
export interface RESTGetListLogsQueryParams extends RESTCursorOptions {
	code?: number;
	method?: string;
	endpoint?: string;
}
export type RESTGetListAPIKeyLogsQueryParams = RESTGetListLogsQueryParams;
export type RESTGetListAPIKeyLogsData = RESTGetListLogsData;

export type RESTGetDeliveryData = APIResponse<
	APIDeliverySummary & {
		payload: WebhookEvent;
		webhookId: Snowflake | null;
	}
>;
export type RESTGetListDeliveriesData = APIResponseWithCursor<
	APICompactDelivery[]
>;
export interface RESTGetListDeliveriesQueryParams extends RESTCursorOptions {
	webhookId?: Snowflake;
	messageId?: Snowflake;
	type?: WebhookEventType;
}
export type RESTGetListWebhookDeliveriesData = APIResponseWithCursor<
	APIDeliverySummary[]
>;
export interface RESTGetListWebhookDeliveriesQueryParams
	extends RESTCursorOptions {
	type?: WebhookEventType;
	status?: WebhookDeliveryStatus;
	code?: number;
	attempt?: number;
	messageId?: Snowflake;
}

export type RESTGetWebhookLogData = RESTGetDeliveryData;
export type RESTGetListWebhookLogsData = RESTGetListWebhookDeliveriesData;
export type RESTGetListWebhookLogsQueryParams =
	RESTGetListWebhookDeliveriesQueryParams;

export interface RESTMessageSegmentation {
	max: number;
	mode?: MessageSegmentationMode;
	smart?: boolean;
}

interface RESTMessageBaseBody {
	tags?: Metadata;
	scheduledAt?: string;
	segmentation?: RESTMessageSegmentation;
}

export interface RESTMessageInlineBody extends RESTMessageBaseBody {
	to: string;
	content: string;
}

export interface RESTMessageInlineContactBody extends RESTMessageBaseBody {
	contact: string;
	content: string;
}

interface RESTMessageTemplateBaseBody extends RESTMessageBaseBody {
	templateId: Snowflake;
	variables?: Record<string, string>;
}

export interface RESTMessageTemplateBody extends RESTMessageTemplateBaseBody {
	to: string;
}

export interface RESTMessageTemplateContactBody
	extends RESTMessageTemplateBaseBody {
	contact: string;
}

export type RESTPostSendMessageBody =
	| RESTMessageInlineBody
	| RESTMessageInlineContactBody
	| RESTMessageTemplateBody
	| RESTMessageTemplateContactBody;

export type RESTPostSendMessageData = APIResponse<APICreatedMessage>;
export type RESTPostSendBatchMessagesBody = RESTPostSendMessageBody[];
export type RESTPostSendBatchMessagesData = APIResponse<APIBatchMessagesResult>;
export type RESTPostCancelMessageData = APIResponse<null>;
export type RESTGetMessageData = APIResponse<APIMessage>;
export interface RESTGetListMessagesQueryParams extends RESTCursorOptions {
	status?: MessageStatus;
	country?: string;
	encoding?: MessageEncoding;
	scheduled?: boolean;
	withCounts?: boolean;
}
export type RESTGetListMessagesData = APIResponseWithCursorAndCount<
	APIMessage[]
>;

export type RESTPostCreateMessageBody = RESTPostSendMessageBody;
export type RESTPostCreateMessageData = RESTPostSendMessageData;
export type RESTPostCreateMessagesBatchBody = RESTPostSendBatchMessagesBody;
export type RESTPostCreateMessagesBatchData = RESTPostSendBatchMessagesData;
export type RESTPostCreateOTPBody = RESTPostSendOTPMessageBody;
export type RESTPostCreateOTPData = RESTPostSendOTPMessageData;
export type RESTPostVerifyOTPBody = RESTPostVerifyOTPCodeBody;
export type RESTPostVerifyOTPData = RESTPostVerifyOTPCodeData;

export type APITemplateLocaleMap = APITemplateI18n;
export type APIMessageCreateResponse = APICreatedMessage;
export type APIMessageBatchCreateResponse = APIBatchMessagesResult;
export type APIOTPCreateResponseData = APIOTPMessage;
export type APIOTPVerifyResponseData = APIOTPVerification;
export type APIWebhookEvent = WebhookEvent;
export type APIWebhookEventData = WebhookEvent['data'];
export type APIWebhookLog = APIDeliverySummary & {
	payload: WebhookEvent;
	webhookId: Snowflake | null;
};
export type APIWebhookLogSummary = APIDeliverySummary;
