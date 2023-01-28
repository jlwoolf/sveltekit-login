import { PB_ROUTE } from '$env/static/private';
import PocketBase from 'pocketbase'

export const pb = new PocketBase(PB_ROUTE);

export type pbUser = {
    id: string,
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string,
    created: string,
    updated: string,
    addresses?: Array<string>
}

export type apiUser = {
    id: string,
    username: string,
    email: string,
    first_name?: string,
    last_name?: string,
    avatar?: string,
    created: string,
    updated: string,
    addresses?: Array<string>,
    message: string
}

export type apiRequest = {
    email?: string,
    firstName?: string,
    lastName?: string,
}

export type apiLogin = {
    email?: string,
    password?: string,
}

export type pbSession = {
    id: string,
    sid: string,
    data: object,
    created: string,
    updated: string,
}

export type apiSession = {
    id: string,
    sid: string,
    data?: apiRequest | apiLogin,
    user?: apiUser,
    created: string,
    updated: string,
    message: string
}