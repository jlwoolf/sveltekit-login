import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ fetch, url }) => {
    if(url.searchParams.has('sid')) {
        const sid = url.searchParams.get('sid');
		const res = await fetch(`/api/sessions/${sid}/delete`);

        throw redirect(302, `/timeout`);
    }
}