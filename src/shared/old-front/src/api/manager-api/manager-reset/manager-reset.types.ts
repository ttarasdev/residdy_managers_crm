export interface RequestResetDto {
	email: string
}

export interface ConfirmResetDto {
	email: string
	code: string
	newPassword: string
}

export interface OkResponse {
	ok: boolean
}
