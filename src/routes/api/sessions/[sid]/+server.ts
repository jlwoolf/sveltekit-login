import { PB_ADMIN, PB_PASSWORD } from '$env/static/private';
import type { RequestHandler } from './$types';

import type { apiLogin, apiRequest, apiSession, apiUser, pbSession, pbUser } from '$lib/pocketbase';
import { pb } from '$lib/pocketbase';

export const GET: RequestHandler = async ({ params, getClientAddress, fetch }) => {
	try {
		if (!pb.authStore.isValid) {
			await pb.admins.authWithPassword(PB_ADMIN, PB_PASSWORD);
		}
	} catch (error) {
		return new Response(
			JSON.stringify({
				message: 'Internal Server Error'
			}),
			{ status: 500 }
		);
	}

	try {
		// get session associated with sid
		const session_res: pbSession = await pb
			.collection('sessions')
			.getFirstListItem(`sid="${params.sid}"`);

		// runs if session is over 60 minutes old. Returns gone, acquiring a new session
		const expireDate = new Date(Date.now());
		expireDate.setMinutes(expireDate.getMinutes() - 6);
		if (new Date(session_res.updated).getTime() < expireDate.getTime()) {
			await pb.collection('sessions').delete(session_res.id);
			return new Response(
				JSON.stringify({
					message: 'Gone'
				}),
				{ status: 410 }
			);
		}

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

				return new Response(JSON.stringify(session), {
					status: user_res.status
				});
			}
		}

		// no inputted email
		return new Response(JSON.stringify(session), {
			status: 200
		});
	} catch {
		return new Response(
			JSON.stringify({
				message: 'Not Found'
			}),
			{ status: 404 }
		);
	}
};
