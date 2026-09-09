import { Languages } from '@/shared/types-enums/lans'

export interface CaseReminder {
	id: number
	lan: Languages
	topic: string
	text: string
	sendInApp: boolean
	sendEmail: boolean
	createdAt: string
	updatedAt: string
}

export interface CreateCaseReminderDto {
	lan: Languages
	topic: string
	text: string
	sendInApp?: boolean
	sendEmail?: boolean
}

export interface UpdateCaseReminderBodyDto
	extends Partial<CreateCaseReminderDto> {}

export interface UpdateCaseReminderDto {
	id: number
	dto: UpdateCaseReminderBodyDto
}

export interface QueryCaseReminderDto {
	limit?: number
	offset?: number
}

export interface CaseRemindersResponse {
	rows: CaseReminder[]
	count: number
}
