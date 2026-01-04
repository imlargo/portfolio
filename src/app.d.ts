import { User } from '$lib/domain/models';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null;
			accessToken: string | undefined | null;
			refreshToken: string | undefined | null;
		}

		interface Platform {
			env: Env;
			ctx: ExecutionContext;
			caches: CacheStorage;
			cf?: IncomingRequestCfProperties;
		}

		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
