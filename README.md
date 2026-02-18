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

## Usage

### Importing v1 Types

</div>

```ts
import type {
	APIResponse,
	RESTGetProjectData,
	RESTPostCreateWebhookBody,
} from '@rewritejs/types/v1';
```

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
const webhookId = '999';

// https://api.rewritetoday.com/v1/projects/123/webhooks/999
const url = `${API_BASE_URL}/v1${Routes.webhooks.get(projectId, webhookId)}`;
```

<div align="center">

Made with 🤍 by the Rewrite team. <br />
SMS the way it should be.

</div>
