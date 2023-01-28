// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
import PocketBase from 'pocketbase'
import type { BaseAuthStore } from 'pocketbase';
import type { Transporter } from 'nodemailer';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: PocketBase;
			user: BaseAuthStore.model;
			transporter: Transporter;
			redirect?: URL;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
