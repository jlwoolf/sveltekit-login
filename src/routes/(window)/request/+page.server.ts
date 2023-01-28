import { goto } from '$app/navigation';
import type { apiSession, pbSession, pbUser } from '$lib/pocketbase';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import nodemailer from 'nodemailer';
import { PB_ADMIN } from '$env/static/private';

export const load: PageServerLoad = async ({ fetch, url }) => {
	if (url.searchParams.has('sid')) {
		const sid = url.searchParams.get('sid');
		const res = await fetch(`/api/sessions/${sid}`);

		if (res.ok) {
			const data: apiSession = JSON.parse(await res.text());
			return data;
		}
	}

	throw redirect(302, `${url.origin}/signin`);
};

export const actions: Actions = {
	submit: async ({ fetch, request, url, locals }) => {
		const sid = url.searchParams.get('sid')!;
		const formData = await request.formData();

		const email = formData.get('email');
		const firstName = formData.get('firstName');
		const lastName = formData.get('lastName');

		let errors = { email: '', firstName: '', lastName: '' };

		if (!email) {
			errors.email = 'Enter an email';
		} else if (
			!(email as string)
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				)
		) {
			errors.email = 'Invalid email format';
		}

		if (!firstName) {
			errors.firstName = 'Enter your first name';
		}
		if (!lastName) {
			errors.lastName = 'Enter your last name';
		}

		if (errors.email || errors.firstName || errors.lastName) {
			return fail(400, {
				email,
				firstName,
				lastName,
				errors
			});
		}

		const user_res = await fetch(`/api/users/${email}`);

		if (user_res.ok) {
			errors.email = `'Svelte' Account already exists.`;
			return fail(400, {
				email,
				firstName,
				lastName,
				errors
			});
		}

		await fetch(`api/sessions/${sid}/delete`)
		
		try {
			locals.transporter.sendMail({
				from: 'support@jlwoolf.com',
				replyTo: `${email}`,
				to: `${PB_ADMIN}`,
				subject: `Account Request for ${email}`,
				text: 'HELLO WORLD!'
			});
		} catch (error) {
			errors.email = `Unable to send request. Please try again later.`;
			return fail(500, {
				email,
				firstName,
				lastName,
				errors
			});
		}

		throw redirect(302, `${url.origin}/request/sent`);
	},
	timeout: ({ url }) => {
		throw redirect(302, `${url.origin}/timeout`);
	}
};
