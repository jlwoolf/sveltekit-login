import { PB_ADMIN, PB_PASSWORD } from '$env/static/private';
import type { RequestHandler } from './$types';
import type { pbUser } from '$lib/pocketbase';

import { pb } from '$lib/pocketbase';

export const GET: RequestHandler = async ({ params, getClientAddress }) => {
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
		// get user information
		const res: pbUser = await pb.collection('users').getFirstListItem(`email="${params.email}"`);
	
		// if the client's ip is not known for the user
		// refuse access
		if (!res.addresses || !res.addresses.includes(getClientAddress())) {
			return new Response(
				JSON.stringify({
                    message: "Non authoritative information",
					email: res.email,
                    id: res.id
				}),
				{ status: 203 }
			);
		}

		// if the client's ip is recognized share user information
		return new Response(
			JSON.stringify(
				Object.assign(
					{
						message: 'OK'
					},
					res
				)
			),
			{ status: 200 }
		);
	} catch {
		return new Response(
			JSON.stringify({
				message: 'Not Found'
			}),
			{ status: 404 }
		);
	}
};
