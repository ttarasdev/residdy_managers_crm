export enum ROLE_NAMES {
	OWNER = 'owner',
	MANAGER = 'manager',
	PUBLISHER = 'publisher',
	SENDER = 'sender',
	ADMIN = 'admin',
	TEST_FORBIDEN = 'forbiden',
}

export type UserRoleObject = {
	id: number
	name: ROLE_NAMES
}

export type DecodedToken = {
	email: string
	id: number
	roles: UserRoleObject[]
	iat: number
	exp: number
}
