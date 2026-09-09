import { PublicAsset } from '@/api/media/public-assets/public-assets.types'
import { Languages } from '@/shared/types-enums/lans'

export enum CaseTypeStatus {
	DRAFT = 'draft',
	ACTIVE = 'active',
	ARCHIVED = 'archived',
}

export interface CaseType {
	id: number
	title: string
	description: string
	status: CaseTypeStatus
	iconId: number
	isPopular: boolean
	lan: Languages
	icon: PublicAsset
	createdAt: string
	updatedAt: string
}

export interface CaseTypeListResponse {
	rows: CaseType[]
	count: number
}

export interface CreateCaseTypeRequest {
	title: string
	description: string
	status?: CaseTypeStatus
	iconId: number
	isPopular?: boolean
	lan: Languages
}

export interface UpdateCaseTypeRequest {
	id: number
	dto: Partial<CaseType>
}

export interface QueryCaseTypes {
	status?: CaseTypeStatus
	lan?: Languages
	isPopular?: boolean
	limit?: number
	offset?: number
}
