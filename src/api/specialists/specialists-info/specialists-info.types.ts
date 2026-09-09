import type { Languages } from '../../common.types'
import type { Specialist } from '../specialists/specialists.types'

export interface SpecialistInfo {
    id: number
    specialistId: number
    specialist?: Specialist | null
    title: string | null
    about: string | null
    languages: Languages[] | null
    specialization: string | null
    experienceYears: number | null
    education: string | null
    certificates: string[] | null
    servicesSummary: string | null
    socialLinks: Record<string, string> | null
    website: string | null
    createdAt: string
    updatedAt: string
}
