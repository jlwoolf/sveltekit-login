import type { apiLogin, apiSession, pbUser } from '$lib/pocketbase';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, url }) => {
	if (url.searchParams.has('sid')) {
		const sid = url.searchParams.get('sid');
		const res = await fetch(`/api/sessions/${sid}`);

		if (res.ok) {
			const data: apiSession = JSON.parse(await res.text());
			return data;
		}
	}

	const res = await fetch('/api/sessions');
	const data = JSON.parse(await res.text());
	throw redirect(302, `/signin?sid=${data.sid}`);
};

export const actions: Actions = {
	login: async ({ fetch, request, url }) => {
		const sid = url.searchParams.get('sid')!;
		const formData = await request.formData();

		const email = formData.get('email');

		if (!email) {
			return fail(400, {
				error: true,
				message: 'Enter an email'
			});
		}

		if (
			!(email as string)
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				)
		) {
			return fail(400, {
				error: true,
				message: 'Invalid email format',
				email
			});
		}

		const user_res = await fetch(`/api/users/${email}`);

		if (!user_res.ok) {
			return fail(400, {
				error: true,
				message: `Couldn't find 'Svelte' Account`,
				email
			});
		}

		const password = formData.get('password') ?? undefined;

		const res = await fetch(`api/sessions/${sid}/update`, {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: {
				'content-type': 'application/json'
			}
		});

		if(res.ok) throw redirect(302, `/signin/password?sid=${sid}`);
		throw redirect(302, `/timeout`);
	},
	request: async ({ fetch, request, url }) => {
		const sid = url.searchParams.get('sid')!;
		const formData = await request.formData();

		const email = formData.get('email');

		const res = await fetch(`api/sessions/${sid}`, {
			method: 'POST',
			body: JSON.stringify({ email }),
			headers: {
				'content-type': 'application/json'
			}
		});
		
		throw redirect(302, `${url.origin}/request?sid=${sid}`);
		
	},

	timeout: ({ url }) => {
		const sid = url.searchParams.get('sid')!;
		throw redirect(302, `${url.origin}/timeout?sid=${sid}`);
	}
};
