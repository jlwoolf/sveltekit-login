import type { apiSession, pbUser } from '$lib/pocketbase';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
	if (url.searchParams.has('sid')) {
		const sid = url.searchParams.get('sid');
		const res = await fetch(`/api/sessions/${sid}`);

		console.log(sid)

		if (res.ok) {
			const data: apiSession = JSON.parse(await res.text());
			return data;
		}
	}

	throw redirect(302, `${url.origin}/signin`);
};

export const actions: Actions = {
	login: async ({ request, locals, getClientAddress, fetch, url }) => {
		const sid = url.searchParams.get('sid')!;
		const formData = await request.formData();

		const password = formData.get('password') as string;
		const email = formData.get('email') as string;

		if (!password) {
			return fail(400, {
				error: true,
				message: 'Enter a password'
			});
		}

		if (!email) {
			return fail(400, {
				error: true,
				message: 'Something went wrong, please contact jlwoolf@proton.me'
			});
		}

		try {
			const { record, token }: { record: pbUser; token: string } = await locals.pb
				.collection('users')
				.authWithPassword(email, password);

			if(!record.addresses) {
				locals.pb.collection('users').update(record.id, {addresses: [getClientAddress()]});
			} else if (!record.addresses.includes(getClientAddress())) {
				locals.pb
				.collection('users')
				.update(record.id, { addresses: record.addresses.concat([getClientAddress()]) });
			}				
		} catch (error) {
			return fail(400, {
				error: true,
				message: 'Wrong password. Try again or click Forgot password to reset it.',
				password: password
			});
		}

		await fetch(`/api/sessions/${sid}/delete`)

		throw redirect(302, `/home`);
	},
	timeout: ({ url }) => {
		const sid = url.searchParams.get('sid')!;

		throw redirect(302, `${url.origin}/timeout`);
	},
	forgot: ({ url }) => {
		const sid = url.searchParams.get('sid')!;

		throw redirect(302, `${url.origin}/signin/password/forgot?sid=${sid}`);
	}
};
