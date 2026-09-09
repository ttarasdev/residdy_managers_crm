export interface CreateGdocVarDto {
	key: string
	labelUA: string
	labelPL: string
	labelEN: string
	labelRU: string
}

export interface GetGdocVarsQueryDto {
	page?: number
	limit?: number
	search?: string
}

export interface GdocVar {
	id: number
	key: string
	labelUA: string
	labelPL: string
	labelEN: string
	labelRU: string
	createdAt: string
	updatedAt: string
}

export interface GdocVarsResponse {
	items: GdocVar[]
	total: number
}
