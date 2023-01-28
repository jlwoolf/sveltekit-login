import type { RequestHandler } from './$types';
import { PB_ADMIN, PB_PASSWORD } from '$env/static/private';

import type { apiSession, pbSession, pbUser } from '$lib/pocketbase';
import { pb } from '$lib/pocketbase';

export const GET: RequestHandler = async ({ request, params, fetch }) => {
	// use existing api to fetch session
	const res = await fetch(`/api/sessions/${params.sid}`);

	if (res.ok) {
		// get the session data
		const session: apiSession = JSON.parse(await res.text());

		// delete the session. if id does not exist, then throw internal server error.
		try {
			await pb.collection('sessions').delete(session.id);
			session.message = "Deleted"
			return new Response(JSON.stringify(session), { status: 200 });
		} catch (error) {
			return new Response(
				JSON.stringify({
					message: 'Internal Server Error'
				}),
				{ status: 500 }
			);
		}
	}

	// return error if not OK
	return res;
};
