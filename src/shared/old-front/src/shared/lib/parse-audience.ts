import { AudienceFilters } from '@/api/mails-api/mail-jobs/mail-jobs.types'

export const parseAudience = (raw: any): AudienceFilters => {
	if (!raw) return {}
	if (typeof raw === 'string') {
		try {
			return JSON.parse(raw) as AudienceFilters
		} catch {
			return {}
		}
	}
	return raw as AudienceFilters
}
