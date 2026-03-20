<div align="center">

# Rewrite Types

[@rewritejs/types](https://www.npmjs.com/package/@rewritejs/types), an official **TypeScript types** for the **Rewrite API**.

This package provides shared resource models, request/response contracts, and route builders used by Rewrite SDKs and applications. It is designed to keep API integrations strongly typed and consistent across projects.

## Installation

You can use this package with your *favorite package manager*

</div>

```bash
bun add @rewritejs/types
# Or
npm install @rewritejs/types
# Or
pnpm install @rewritejs/types
# Or
yarn add @rewritejs/types
```

<div align="center">

## Using

### How we document our types

</div>

- Prefix `API*`
Represents general API structures (returned objects, internal models, etc.).

- Prefix `REST<HTTPMethod>*`
Types used in direct API requests.
  - Suffix Body → request body payload
  E.g.: `RESTPostCreateTemplateBody`

  - Suffix `QueryParams` → query string parameters
  E.g.: `RESTGetListWebhooksQueryParams`

  - Suffix `Data` → data returned by the API
  E.g.: `RESTGetListWebhooksData`

<div align="center">

### Typing API Responses

</div>

```ts
import { REST } from '@rewritejs/rest';
import { Routes, type RESTGetProjectData } from '@rewritejs/types/v1';

const rest = new REST(process.env.REWRITE_API_KEY);

// Return type: Promise<RESTGetWebhooksData>
async function fetchWebhooks(projectId: string) {
	const data = await rest.get<RESTGetWebhooksData>(Routes.webhooks.list(projectId));
	
	return data
}
```

<div align="center">

### Using Route Builders

</div>

```ts
import { API_BASE_URL, Routes } from '@rewritejs/types/v1';

const projectId = '123';
const templateId = '456';
const webhookId = '999';
const apiKeyId = '321';

const routes = {
	webhooks: {
		list: `${API_BASE_URL}/v1${Routes.webhooks.list(projectId)}`,
		create: `${API_BASE_URL}/v1${Routes.webhooks.create(projectId)}`,
		update: `${API_BASE_URL}/v1${Routes.webhooks.update(projectId, webhookId)}`,
		delete: `${API_BASE_URL}/v1${Routes.webhooks.delete(projectId, webhookId)}`,
		get: `${API_BASE_URL}/v1${Routes.webhooks.get(projectId, webhookId)}`,
	},
	templates: {
		list: `${API_BASE_URL}/v1${Routes.templates.list(projectId)}`,
		create: `${API_BASE_URL}/v1${Routes.templates.create(projectId)}`,
		update: `${API_BASE_URL}/v1${Routes.templates.update(projectId, templateId)}`,
		delete: `${API_BASE_URL}/v1${Routes.templates.delete(projectId, templateId)}`,
		get: `${API_BASE_URL}/v1${Routes.templates.get(projectId, templateId)}`,
	},
	apiKeys: {
		list: `${API_BASE_URL}/v1${Routes.apiKeys.list(projectId)}`,
		create: `${API_BASE_URL}/v1${Routes.apiKeys.create(projectId)}`,
		delete: `${API_BASE_URL}/v1${Routes.apiKeys.delete(projectId, apiKeyId)}`,
	},
	projects: {
		create: `${API_BASE_URL}/v1${Routes.projects.create()}`,
		update: `${API_BASE_URL}/v1${Routes.projects.update(projectId)}`,
		delete: `${API_BASE_URL}/v1${Routes.projects.delete(projectId)}`,
		get: `${API_BASE_URL}/v1${Routes.projects.get(projectId)}`,
	},
};
```

<div align="center">

Made with 🤍 by the Rewrite team. <br />
SMS the way it should be.

</div>
