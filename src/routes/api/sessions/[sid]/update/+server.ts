import type { RequestHandler } from './$types';

import type { apiLogin, apiRequest, apiSession, apiUser, pbSession, pbUser } from '$lib/pocketbase';
import { pb } from '$lib/pocketbase';

export const POST: RequestHandler = async ({ request, params, fetch }) => {
	try {
		const data: apiLogin | apiRequest = await request.json();

		try {
			// get session associated with sid
			const session_res: pbSession = await pb
				.collection('sessions')
				.getFirstListItem(`sid="${params.sid}"`);

			const session: apiSession = Object.assign({ message: 'OK' }, session_res);

			// if there is an inputted email
			if (session.data && session.data.email) {
				// fetch user from email
				const user_res = await fetch(`/api/users/${session.data.email}`);

				// user exists
				if (user_res.ok) {
					const user: apiUser = JSON.parse(await user_res.text());
					session.user = user;
					session.message = user.message;
				}
			}

			// update the session. if id does not exist, then throw internal server error.
			try {
				const res: pbSession = await pb.collection('sessions').update(session.id, { data: data });
				const updated: apiSession = Object.assign({ message: 'Updated' }, res);
				return new Response(JSON.stringify(updated), { status: 200 });
			} catch (error) {
				return new Response(
					JSON.stringify({
						message: 'Internal Server Error'
					}),
					{ status: 500 }
				);
			}
		} catch {
			return new Response(
				JSON.stringify({
					message: 'Not Found'
				}),
				{ status: 404 }
			);
		}
	} catch (error) {
		return new Response(
			JSON.stringify({
				message: 'Bad Request'
			}),
			{ status: 404 }
		);
	}
};

export const GET: RequestHandler = async ({ request, params, fetch }) => {
	try {
		// get session associated with sid
		const session_res: pbSession = await pb
			.collection('sessions')
			.getFirstListItem(`sid="${params.sid}"`);

		const session: apiSession = Object.assign({ message: 'OK' }, session_res);

		// if there is an inputted email
		if (session.data && session.data.email) {
			// fetch user from email
			const user_res = await fetch(`/api/users/${session.data.email}`);

			// user exists
			if (user_res.ok) {
				const user: apiUser = JSON.parse(await user_res.text());
				session.user = user;
				session.message = user.message;
			}
		}

		// update the session. if id does not exist, then throw internal server error.
		try {
			const res: pbSession = await pb.collection('sessions').update(session.id);
			const updated: apiSession = Object.assign({ message: 'Updated' }, res);
			return new Response(JSON.stringify(updated), { status: 200 });
		} catch (error) {
			return new Response(
				JSON.stringify({
					message: 'Internal Server Error'
				}),
				{ status: 500 }
			);
		}
	} catch {
		return new Response(
			JSON.stringify({
				message: 'Not Found'
			}),
			{ status: 404 }
		);
	}
};
