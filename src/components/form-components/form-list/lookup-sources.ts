import type { Languages } from '../../../api/common.types'
import type { FormListItem } from './FormList'
import { rolesApi } from '../../../api/managers/roles/roles.api'
import { blogCategoriesApi } from '../../../api/blog/blog-categories/blog-categories.api'
import { caseTypesApi } from '../../../api/cases/case-types/case-types.api'
import { caseInstructionsApi } from '../../../api/cases/case-instructions/case-instructions.api'
import { caseRemindersApi } from '../../../api/cases/case-reminders/case-reminders.api'
import { gDocTypesApi } from '../../../api/documents/g-doc-types/g-doc-types.api'
import { gDocVarsApi } from '../../../api/documents/g-doc-vars/g-doc-vars.api'
import { consultationCategoriesApi } from '../../../api/consultations/consultation-categories/consultation-categories.api'
import { specialistsApi } from '../../../api/specialists/specialists/specialists.api'

export interface LookupFilters {
    lan?: Languages
}

export interface LookupResult {
    rows: FormListItem[]
    total: number
}

export const lookupSources = {
    roles: async (
        page: number,
        filters: LookupFilters,
        signal: AbortSignal,
    ): Promise<LookupResult> => {
        const data = await rolesApi.list({ page, limit: 40 }, { signal })

        return {
            total: data.total,
            rows: data.rows.map((role) => ({
                id: role.id,
                title: role.name,
                subtitle: `id: ${role.id}`,
            })),
        }
    },
    blogCategories: async (
        page: number,
        filters: LookupFilters,
        signal: AbortSignal,
    ): Promise<LookupResult> => {
        const data = await blogCategoriesApi.list(
            { page, limit: 40 },
            { signal },
        )

        return {
            total: data.total,
            rows: data.rows.map((role) => ({
                id: role.id,
                title: role.name_pl,
                subtitle: new Date(role.createdAt).toLocaleDateString('pl-PL'),
            })),
        }
    },
    caseTypes: async (
        page: number,
        filters: LookupFilters,
        signal: AbortSignal,
    ): Promise<LookupResult> => {
        const data = await caseTypesApi.list(
            { page, limit: 40, ...filters },
            { signal },
        )

        return {
            total: data.total,
            rows: data.rows.map((role) => ({
                id: role.id,
                title: role.title,
                subtitle: role.description,
            })),
        }
    },
    caseInstructions: async (
        page: number,
        filters: LookupFilters,
        signal: AbortSignal,
    ): Promise<LookupResult> => {
        const data = await caseInstructionsApi.list(
            { page, limit: 40, ...filters },
            { signal },
        )

        return {
            total: data.total,
            rows: data.rows.map((role) => ({
                id: role.id,
                title: role.title,
                subtitle: role.description,
            })),
        }
    },
    caseReminders: async (
        page: number,
        filters: LookupFilters,
        signal: AbortSignal,
    ): Promise<LookupResult> => {
        const data = await caseRemindersApi.list(
            { page, limit: 40, ...filters },
            { signal },
        )

        return {
            total: data.total,
            rows: data.rows.map((role) => ({
                id: role.id,
                title: role.topic,
                subtitle: role.lan,
            })),
        }
    },
    documentTypes: async (
        page: number,
        filters: LookupFilters,
        signal: AbortSignal,
    ): Promise<LookupResult> => {
        const data = await gDocTypesApi.list({ page, limit: 40 }, { signal })

        return {
            total: data.total,
            rows: data.rows.map((role) => ({
                id: role.id,
                title: role.titlePL,
                subtitle: new Date(role.createdAt).toLocaleDateString('pl-PL'),
            })),
        }
    },
    documentVariables: async (
        page: number,
        filters: LookupFilters,
        signal: AbortSignal,
    ): Promise<LookupResult> => {
        const data = await gDocVarsApi.list({ page, limit: 40 }, { signal })

        return {
            total: data.total,
            rows: data.rows.map((role) => ({
                id: role.id,
                title: role.labelPL,
                subtitle: role.key,
            })),
        }
    },
    consultationCategories: async (
        page: number,
        filters: LookupFilters,
        signal: AbortSignal,
    ): Promise<LookupResult> => {
        const data = await consultationCategoriesApi.list(
            { page, limit: 40 },
            { signal },
        )

        return {
            total: data.total,
            rows: data.rows.map((role) => ({
                id: role.id,
                title: role.titlePl,
                subtitle: new Date(role.createdAt).toLocaleDateString('pl-PL'),
            })),
        }
    },
    specialists: async (
        page: number,
        filters: LookupFilters,
        signal: AbortSignal,
    ): Promise<LookupResult> => {
        const data = await specialistsApi.list({ page, limit: 40 }, { signal })

        return {
            total: data.total,
            rows: data.rows.map((role) => ({
                id: role.id,
                title:
                    [role.name, role.surname].filter(Boolean).join(' ') ||
                    `#${role.id}`,
                subtitle: role.account?.email,
            })),
        }
    },
}
