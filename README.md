<div align="center">

# Rewrite Types

[@rewritejs/types](https://www.npmjs.com/package/@rewritejs/types), an official **TypeScript types** for the **Rewrite API**.

This package provides shared resource models, request/response contracts, and route builders used by Rewrite SDKs and applications. It is designed to keep API integrations strongly typed and consistent across projects.

## Installation

You can use this package with your *favorite package manager*

</div>

```bash
bun add @rewritejs/types
```

<div align="center">

Or with npm:

</div>

```bash
npm install @rewritejs/types
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
import type { RESTGetProjectData } from '@rewritejs/types/v1';

async function getProject(projectId: string): Promise<RESTGetProjectData> {
	// Your HTTP call here
	return {
		ok: true,
		data: {
			id: '123456789012345678',
			name: 'My Project',
			ownerId: '987654321098765432',
			icon: 'https://cdn.rewritetoday.com/users/123456789012345678/abc.webp',
		},
	};
}
```

<div align="center">

### Using Route Builders

</div>

```ts
import { API_BASE_URL, Routes } from '@rewritejs/types/v1';

const projectId = '123';
const webhookId = '999';

const url = `${API_BASE_URL}/v1${Routes.webhooks.get(projectId, webhookId)}`;
// https://api.rewritetoday.com/v1/projects/123/webhooks/999
```

<div align="center">

### Cursor Query Helper

</div>

```ts
import { createCursorQuery } from '@rewritejs/types/v1/utils';

const query = createCursorQuery({ limit: 20, after: '1000' }).toString();
// limit=20&after=1000
```

<div align="center">

Made with 🤍 by the Rewrite team. <br />
SMS the way it should be.

</div>
