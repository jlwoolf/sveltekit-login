import { pb, type apiSession } from '$lib/pocketbase';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, url }) => {
	const sid = url.searchParams.get('sid');
	const res = await fetch(`/api/sessions/${sid}/delete`);

	if (res.ok) {
		const session: apiSession = JSON.parse(await res.text());
        if(session.data?.email)
            pb.collection('users').requestPasswordReset(session.data?.email);
		return session;
	} else {
		throw redirect(302, `/signin`);
	}
};
