import { PublicAsset } from '@/api/media/public-assets/public-assets.types'
import { Languages } from './lans'

export type TableRow<TStatus = string> = {
	id: number
	title?: string
	status?: TStatus
	iconId?: number
	icon?: PublicAsset
	isPopular?: boolean
	lan?: Languages
	version?: number
	subtitle?: string
	description?: string
	typeId?: number
	createdAt?: string
	updatedAt?: string
}
