import { PB_ADMIN, PB_PASSWORD } from '$env/static/private';
import { randomBytes } from 'crypto';
import type { RequestHandler } from './$types';

import { pb } from '$lib/pocketbase';
import type { pbSession } from '$lib/pocketbase';

export const GET: RequestHandler = async ({ params }) => {
	try {
		if (!pb.authStore.isValid) {
			await pb.admins.authWithPassword(PB_ADMIN, PB_PASSWORD);
		}

		const hash = randomBytes(64).toString('base64url');
		const res: pbSession = await pb.collection('sessions').create({ sid: hash });
		return new Response(JSON.stringify(res), { status: 200 });
	} catch {
		return new Response(
			JSON.stringify({
				message: 'Internal Server Error'
			}),
			{ status: 500 }
		);
	}
};
