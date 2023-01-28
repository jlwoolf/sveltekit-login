import { PB_ROUTE, SMTP_EMAIL_HOST, SMTP_EMAIL_PASS, SMTP_EMAIL_USER } from '$env/static/private';
import { redirect, type Handle } from '@sveltejs/kit';
import { createTransport } from 'nodemailer';
import PocketBase from 'pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
	let { locals, fetch, request, url } = event;

    // init pocketbase (for user)
	locals.pb = new PocketBase(PB_ROUTE);
	
    // init email transporter
    locals.transporter = createTransport({
		host: SMTP_EMAIL_HOST,
		port: 587,
		secure: false,
		auth: {
			user: SMTP_EMAIL_USER,
			pass: SMTP_EMAIL_PASS
		}
	});

    // load auth from cookie (if exists)
	locals.pb.authStore.loadFromCookie(request.headers.get('cookie') || '');
	if (locals.pb.authStore.isValid) {
		locals.user = locals.pb.authStore.model;
	}

    // if not path
	if (url.pathname.length == 1 || url.pathname.length == 0) {
		if (!locals.pb.authStore.isValid) {
			throw redirect(303, '/signin');
		} else {
			throw redirect(303, '/home');
		}
	}

    const protected_paths = ['/home'];
	// if path is supposed to be protected
	if (
		protected_paths.some((path) => {
			return url.pathname.startsWith(path);
		})
	) {
		// user is not authenticated
		if (!locals.pb.authStore.isValid) {
			locals.redirect = url;
			throw redirect(303, '/signin');
		}
	}

    // if signin path
	if (url.pathname.startsWith('/signin')) {
        // if authenticated, direct to home
		if (locals.pb.authStore.isValid) {
			throw redirect(303, '/home');
		}
	}

	const response = await resolve(event);

	// TODO: secure before deployment
	response.headers.set('set-cookie', locals.pb.authStore.exportToCookie({ secure: false }));
	return response;
};
