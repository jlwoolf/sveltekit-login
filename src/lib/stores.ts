import { writable } from "svelte/store";
import type { Record } from "pocketbase";
import { browser } from "$app/environment";

export const user = writable<Record | null>(null);
export const password = writable<string | null>(null);