import type { Operation } from '../types'
import { accountAuthApi } from '../../../api/accounts/account-auth/account-auth.api'
import { accountsApi } from '../../../api/accounts/accounts/accounts.api'
import { analyticsApi } from '../../../api/analytics/analytics.api'
import { appAnnouncementsApi } from '../../../api/app-announcements/app-announcements.api'
import { blogCategoriesApi } from '../../../api/blog/blog-categories/blog-categories.api'
import { blogPostsApi } from '../../../api/blog/blog-posts/blog-posts.api'
import { caseInstructionBlocksApi } from '../../../api/cases/case-instruction-blocks/case-instruction-blocks.api'
import { caseInstructionsApi } from '../../../api/cases/case-instructions/case-instructions.api'
import { caseRemindersApi } from '../../../api/cases/case-reminders/case-reminders.api'
import { caseStageTasksApi } from '../../../api/cases/case-stage-tasks/case-stage-tasks.api'
import { caseStagesApi } from '../../../api/cases/case-stages/case-stages.api'
import { caseTypesApi } from '../../../api/cases/case-types/case-types.api'
import { casesApi } from '../../../api/cases/cases/cases.api'
import { consultationBookingsApi } from '../../../api/consultations/consultation-bookings/consultation-bookings.api'
import { consultationCategoriesApi } from '../../../api/consultations/consultation-categories/consultation-categories.api'
import { consultationReviewsApi } from '../../../api/consultations/consultation-reviews/consultation-reviews.api'
import { specialistConsultationsApi } from '../../../api/consultations/specialist-consultations/specialist-consultations.api'
import { gDocTemplatesApi } from '../../../api/documents/g-doc-templates/g-doc-templates.api'
import { gDocTypesApi } from '../../../api/documents/g-doc-types/g-doc-types.api'
import { gDocVarsApi } from '../../../api/documents/g-doc-vars/g-doc-vars.api'
import { legalDocumentVersionsApi } from '../../../api/legal/legal-document-versions/legal-document-versions.api'
import { legalDocumentsApi } from '../../../api/legal/legal-documents/legal-documents.api'
import { mailAccountsApi } from '../../../api/mail/mail-accounts/mail-accounts.api'
import { mailJobsApi } from '../../../api/mail/mail-jobs/mail-jobs.api'
import { mailQueueApi } from '../../../api/mail/mail-queue/mail-queue.api'
import { mailSignaturesApi } from '../../../api/mail/mail-signatures/mail-signatures.api'
import { mailSnippetsApi } from '../../../api/mail/mail-snippets/mail-snippets.api'
import { mailApi } from '../../../api/mail/mail/mail.api'
import { managersApi } from '../../../api/managers/managers/managers.api'
import { rolesApi } from '../../../api/managers/roles/roles.api'
import { filesApi } from '../../../api/media/files/files.api'
import { privateAssetsApi } from '../../../api/media/private-assets/private-assets.api'
import { privateVariantsApi } from '../../../api/media/private-variants/private-variants.api'
import { publicAssetsApi } from '../../../api/media/public-assets/public-assets.api'
import { userNotificationJobsApi } from '../../../api/notifications/user-notification-jobs/user-notification-jobs.api'
import { userNotificationQueueApi } from '../../../api/notifications/user-notification-queue/user-notification-queue.api'
import { userNotificationsApi } from '../../../api/notifications/user-notifications/user-notifications.api'
import { partnerBannersApi } from '../../../api/partners/partner-banners/partner-banners.api'
import { partnerCompaniesApi } from '../../../api/partners/partner-companies/partner-companies.api'
import { partnerCompanyInfoApi } from '../../../api/partners/partner-company-info/partner-company-info.api'
import { partnersApi } from '../../../api/partners/partners/partners.api'
import { paymentLedgerApi } from '../../../api/payments/payment-ledger/payment-ledger.api'
import { consultationPromocodesApi } from '../../../api/promocodes/consultation-promocodes/consultation-promocodes.api'
import { promocodesApi } from '../../../api/promocodes/promocodes/promocodes.api'
import { userReminderEventsApi } from '../../../api/reminders/user-reminder-events/user-reminder-events.api'
import { userRemindersApi } from '../../../api/reminders/user-reminders/user-reminders.api'
import { specialistsApi } from '../../../api/specialists/specialists/specialists.api'
import { subscriptionPlansApi } from '../../../api/subscriptions/subscription-plans/subscription-plans.api'
import { subscriptionPricesApi } from '../../../api/subscriptions/subscription-prices/subscription-prices.api'
import { userSubscriptionsApi } from '../../../api/subscriptions/user-subscriptions/user-subscriptions.api'
import { usersApi } from '../../../api/users/users/users.api'

// Generated from src/api. Run node scripts/generate-crm-schema.mjs after contract changes.
export const operations: readonly Operation[] = [
    {
        ...{
            id: 'account-auth.requestEmailChange',
            resource: 'account-auth',
            method: 'requestEmailChange',
            verb: 'POST',
            roles: [],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'currentPassword',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'newEmail',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            accountAuthApi.requestEmailChange(
                args[0] as Parameters<
                    typeof accountAuthApi.requestEmailChange
                >[0],
                options,
            ),
    },
    {
        ...{
            id: 'account-auth.confirmEmailChange',
            resource: 'account-auth',
            method: 'confirmEmailChange',
            verb: 'POST',
            roles: [],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'currentPassword',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'newEmail',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'code',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            accountAuthApi.confirmEmailChange(
                args[0] as Parameters<
                    typeof accountAuthApi.confirmEmailChange
                >[0],
                options,
            ),
    },
    {
        ...{
            id: 'account-auth.confirm',
            resource: 'account-auth',
            method: 'confirm',
            verb: 'POST',
            roles: [],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'email',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'code',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            accountAuthApi.confirm(
                args[0] as Parameters<typeof accountAuthApi.confirm>[0],
                options,
            ),
    },
    {
        ...{
            id: 'account-auth.resend',
            resource: 'account-auth',
            method: 'resend',
            verb: 'POST',
            roles: [],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'email',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            accountAuthApi.resend(
                args[0] as Parameters<typeof accountAuthApi.resend>[0],
                options,
            ),
    },
    {
        ...{
            id: 'account-auth.requestPasswordChange',
            resource: 'account-auth',
            method: 'requestPasswordChange',
            verb: 'POST',
            roles: [],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'currentPassword',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            accountAuthApi.requestPasswordChange(
                args[0] as Parameters<
                    typeof accountAuthApi.requestPasswordChange
                >[0],
                options,
            ),
    },
    {
        ...{
            id: 'account-auth.changePassword',
            resource: 'account-auth',
            method: 'changePassword',
            verb: 'POST',
            roles: [],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'currentPassword',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'code',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'password',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            accountAuthApi.changePassword(
                args[0] as Parameters<typeof accountAuthApi.changePassword>[0],
                options,
            ),
    },
    {
        ...{
            id: 'account-auth.login',
            resource: 'account-auth',
            method: 'login',
            verb: 'POST',
            roles: [],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'email',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'password',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            accountAuthApi.login(
                args[0] as Parameters<typeof accountAuthApi.login>[0],
                options,
            ),
    },
    {
        ...{
            id: 'account-auth.forgotPassword',
            resource: 'account-auth',
            method: 'forgotPassword',
            verb: 'POST',
            roles: [],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'email',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            accountAuthApi.forgotPassword(
                args[0] as Parameters<typeof accountAuthApi.forgotPassword>[0],
                options,
            ),
    },
    {
        ...{
            id: 'account-auth.resetPassword',
            resource: 'account-auth',
            method: 'resetPassword',
            verb: 'POST',
            roles: [],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'email',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'code',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'password',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            accountAuthApi.resetPassword(
                args[0] as Parameters<typeof accountAuthApi.resetPassword>[0],
                options,
            ),
    },
    {
        ...{
            id: 'accounts.uploadMyAvatar',
            resource: 'accounts',
            method: 'uploadMyAvatar',
            verb: 'POST',
            roles: [],
            args: [
                {
                    name: 'file',
                    optional: false,
                    nullable: false,
                    kind: 'file',
                },
            ],
        },
        execute: (args, options) =>
            accountsApi.uploadMyAvatar(
                args[0] as Parameters<typeof accountsApi.uploadMyAvatar>[0],
                options,
            ),
    },
    {
        ...{
            id: 'accounts.uploadAvatar',
            resource: 'accounts',
            method: 'uploadAvatar',
            verb: 'POST',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'file',
                    optional: false,
                    nullable: false,
                    kind: 'file',
                },
            ],
        },
        execute: (args, options) =>
            accountsApi.uploadAvatar(
                args[0] as Parameters<typeof accountsApi.uploadAvatar>[0],
                args[1] as Parameters<typeof accountsApi.uploadAvatar>[1],
                options,
            ),
    },
    {
        ...{
            id: 'accounts.getMe',
            resource: 'accounts',
            method: 'getMe',
            verb: 'GET',
            roles: [],
            args: [],
        },
        execute: (args, options) => accountsApi.getMe(options),
    },
    {
        ...{
            id: 'accounts.list',
            resource: 'accounts',
            method: 'list',
            verb: 'GET',
            roles: ['admin'],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'type',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: [
                                'USERS',
                                'MANAGERS',
                                'PARTNERS',
                                'SPECIALISTS',
                            ],
                        },
                        {
                            name: 'id',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'email',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: [
                                'active',
                                'pending',
                                'blocked',
                                'archived',
                            ],
                        },
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            accountsApi.list(
                args[0] as Parameters<typeof accountsApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'accounts.getById',
            resource: 'accounts',
            method: 'getById',
            verb: 'GET',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            accountsApi.getById(
                args[0] as Parameters<typeof accountsApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'accounts.update',
            resource: 'accounts',
            method: 'update',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'legalVersionIds',
                            optional: true,
                            nullable: false,
                            kind: 'array',
                            item: {
                                name: 'item',
                                optional: false,
                                nullable: false,
                                kind: 'number',
                            },
                        },
                        {
                            name: 'avatarId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: [
                                'active',
                                'pending',
                                'blocked',
                                'archived',
                            ],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            accountsApi.update(
                args[0] as Parameters<typeof accountsApi.update>[0],
                args[1] as Parameters<typeof accountsApi.update>[1],
                options,
            ),
    },
    {
        ...{
            id: 'analytics.overview',
            resource: 'analytics',
            method: 'overview',
            verb: 'GET',
            roles: ['admin'],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'from',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'to',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'group',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['day', 'month'],
                        },
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            analyticsApi.overview(
                args[0] as Parameters<typeof analyticsApi.overview>[0],
                options,
            ),
    },
    {
        ...{
            id: 'analytics.subscriptions',
            resource: 'analytics',
            method: 'subscriptions',
            verb: 'GET',
            roles: ['admin'],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'from',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'to',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'group',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['day', 'month'],
                        },
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            analyticsApi.subscriptions(
                args[0] as Parameters<typeof analyticsApi.subscriptions>[0],
                options,
            ),
    },
    {
        ...{
            id: 'analytics.consultations',
            resource: 'analytics',
            method: 'consultations',
            verb: 'GET',
            roles: ['admin'],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'from',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'to',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'group',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['day', 'month'],
                        },
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            analyticsApi.consultations(
                args[0] as Parameters<typeof analyticsApi.consultations>[0],
                options,
            ),
    },
    {
        ...{
            id: 'analytics.usage',
            resource: 'analytics',
            method: 'usage',
            verb: 'GET',
            roles: ['admin'],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'from',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'to',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'group',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['day', 'month'],
                        },
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            analyticsApi.usage(
                args[0] as Parameters<typeof analyticsApi.usage>[0],
                options,
            ),
    },
    {
        ...{
            id: 'analytics.revenue',
            resource: 'analytics',
            method: 'revenue',
            verb: 'GET',
            roles: ['admin'],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'from',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'to',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'group',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['day', 'month'],
                        },
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            analyticsApi.revenue(
                args[0] as Parameters<typeof analyticsApi.revenue>[0],
                options,
            ),
    },
    {
        ...{
            id: 'app-announcements.list',
            resource: 'app-announcements',
            method: 'list',
            verb: 'GET',
            roles: ['writer'],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'enabled',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            appAnnouncementsApi.list(
                args[0] as Parameters<typeof appAnnouncementsApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'app-announcements.getById',
            resource: 'app-announcements',
            method: 'getById',
            verb: 'GET',
            roles: ['writer'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            appAnnouncementsApi.getById(
                args[0] as Parameters<typeof appAnnouncementsApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'app-announcements.create',
            resource: 'app-announcements',
            method: 'create',
            verb: 'POST',
            roles: ['writer'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'intervalMinutes',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'title',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'startsAt',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'endsAt',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'enabled',
                            kind: 'boolean',
                            optional: false,
                            nullable: false,
                        },
                        {
                            name: 'imagePlId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'imageUaId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'imageEnId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'imageRuId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'actionType',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: [
                                'none',
                                'external_url',
                                'screen',
                                'record',
                            ],
                        },
                        {
                            name: 'actionUrl',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'actionScreen',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: [
                                'home',
                                'subscription_plans',
                                'consultations',
                                'blog',
                                'legalization',
                                'partners',
                                'documents',
                            ],
                        },
                        {
                            name: 'actionRecordType',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: [
                                'case',
                                'blog_post',
                                'consultation',
                                'partner_company',
                            ],
                        },
                        {
                            name: 'actionRecordId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            appAnnouncementsApi.create(
                args[0] as Parameters<typeof appAnnouncementsApi.create>[0],
                options,
            ),
    },
    {
        ...{
            id: 'app-announcements.update',
            resource: 'app-announcements',
            method: 'update',
            verb: 'PUT',
            roles: ['writer'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'intervalMinutes',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'title',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'startsAt',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'endsAt',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'enabled',
                            kind: 'boolean',
                            optional: false,
                            nullable: false,
                        },
                        {
                            name: 'imagePlId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'imageUaId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'imageEnId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'imageRuId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'actionType',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: [
                                'none',
                                'external_url',
                                'screen',
                                'record',
                            ],
                        },
                        {
                            name: 'actionUrl',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'actionScreen',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: [
                                'home',
                                'subscription_plans',
                                'consultations',
                                'blog',
                                'legalization',
                                'partners',
                                'documents',
                            ],
                        },
                        {
                            name: 'actionRecordType',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: [
                                'case',
                                'blog_post',
                                'consultation',
                                'partner_company',
                            ],
                        },
                        {
                            name: 'actionRecordId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            appAnnouncementsApi.update(
                args[0] as Parameters<typeof appAnnouncementsApi.update>[0],
                args[1] as Parameters<typeof appAnnouncementsApi.update>[1],
                options,
            ),
    },
    {
        ...{
            id: 'app-announcements.remove',
            resource: 'app-announcements',
            method: 'remove',
            verb: 'DELETE',
            roles: ['writer'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            appAnnouncementsApi.remove(
                args[0] as Parameters<typeof appAnnouncementsApi.remove>[0],
                options,
            ),
    },
    {
        ...{
            id: 'app-announcements.uploadImage',
            resource: 'app-announcements',
            method: 'uploadImage',
            verb: 'POST',
            roles: ['writer'],
            args: [
                {
                    name: 'file',
                    optional: false,
                    nullable: false,
                    kind: 'file',
                },
            ],
        },
        execute: (args, options) =>
            appAnnouncementsApi.uploadImage(
                args[0] as Parameters<
                    typeof appAnnouncementsApi.uploadImage
                >[0],
                options,
            ),
    },
    {
        ...{
            id: 'blog-categories.list',
            resource: 'blog-categories',
            method: 'list',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            blogCategoriesApi.list(
                args[0] as Parameters<typeof blogCategoriesApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'blog-categories.getById',
            resource: 'blog-categories',
            method: 'getById',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            blogCategoriesApi.getById(
                args[0] as Parameters<typeof blogCategoriesApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'blog-categories.create',
            resource: 'blog-categories',
            method: 'create',
            verb: 'POST',
            roles: ['admin'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'name_ua',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'name_pl',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'name_ru',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'name_en',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'sort_key',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            blogCategoriesApi.create(
                args[0] as Parameters<typeof blogCategoriesApi.create>[0],
                options,
            ),
    },
    {
        ...{
            id: 'blog-categories.update',
            resource: 'blog-categories',
            method: 'update',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'name_ua',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'name_pl',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'name_ru',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'name_en',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'sort_key',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            blogCategoriesApi.update(
                args[0] as Parameters<typeof blogCategoriesApi.update>[0],
                args[1] as Parameters<typeof blogCategoriesApi.update>[1],
                options,
            ),
    },
    {
        ...{
            id: 'blog-categories.reorder',
            resource: 'blog-categories',
            method: 'reorder',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'direction',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: ['up', 'down'],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            blogCategoriesApi.reorder(
                args[0] as Parameters<typeof blogCategoriesApi.reorder>[0],
                args[1] as Parameters<typeof blogCategoriesApi.reorder>[1],
                options,
            ),
    },
    {
        ...{
            id: 'blog-categories.remove',
            resource: 'blog-categories',
            method: 'remove',
            verb: 'DELETE',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            blogCategoriesApi.remove(
                args[0] as Parameters<typeof blogCategoriesApi.remove>[0],
                options,
            ),
    },
    {
        ...{
            id: 'blog-posts.list',
            resource: 'blog-posts',
            method: 'list',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'categoryId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'q',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'isPinned',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                        {
                            name: 'isPopular',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: [
                                'draft',
                                'scheduled',
                                'published',
                                'archived',
                            ],
                        },
                        {
                            name: 'lan',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['UA', 'PL', 'EN', 'RU'],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            blogPostsApi.list(
                args[0] as Parameters<typeof blogPostsApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'blog-posts.getById',
            resource: 'blog-posts',
            method: 'getById',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            blogPostsApi.getById(
                args[0] as Parameters<typeof blogPostsApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'blog-posts.create',
            resource: 'blog-posts',
            method: 'create',
            verb: 'POST',
            roles: ['admin'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'contentJson',
                            optional: false,
                            nullable: false,
                            kind: 'json',
                        },
                        {
                            name: 'title',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'variantId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'lan',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: ['UA', 'PL', 'EN', 'RU'],
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: [
                                'draft',
                                'scheduled',
                                'published',
                                'archived',
                            ],
                        },
                        {
                            name: 'isPinned',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                        {
                            name: 'isPopular',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                        {
                            name: 'scheduledAt',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'publishedAt',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'categoryIds',
                            optional: true,
                            nullable: false,
                            kind: 'array',
                            item: {
                                name: 'item',
                                optional: false,
                                nullable: false,
                                kind: 'number',
                            },
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            blogPostsApi.create(
                args[0] as Parameters<typeof blogPostsApi.create>[0],
                options,
            ),
    },
    {
        ...{
            id: 'blog-posts.update',
            resource: 'blog-posts',
            method: 'update',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'contentJson',
                            optional: true,
                            nullable: false,
                            kind: 'json',
                        },
                        {
                            name: 'title',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'variantId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'lan',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['UA', 'PL', 'EN', 'RU'],
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: [
                                'draft',
                                'scheduled',
                                'published',
                                'archived',
                            ],
                        },
                        {
                            name: 'isPinned',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                        {
                            name: 'isPopular',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                        {
                            name: 'scheduledAt',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'publishedAt',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'categoryIds',
                            optional: true,
                            nullable: false,
                            kind: 'array',
                            item: {
                                name: 'item',
                                optional: false,
                                nullable: false,
                                kind: 'number',
                            },
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            blogPostsApi.update(
                args[0] as Parameters<typeof blogPostsApi.update>[0],
                args[1] as Parameters<typeof blogPostsApi.update>[1],
                options,
            ),
    },
    {
        ...{
            id: 'blog-posts.remove',
            resource: 'blog-posts',
            method: 'remove',
            verb: 'DELETE',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            blogPostsApi.remove(
                args[0] as Parameters<typeof blogPostsApi.remove>[0],
                options,
            ),
    },
    {
        ...{
            id: 'blog-posts.schedule',
            resource: 'blog-posts',
            method: 'schedule',
            verb: 'POST',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'scheduledAt',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            blogPostsApi.schedule(
                args[0] as Parameters<typeof blogPostsApi.schedule>[0],
                args[1] as Parameters<typeof blogPostsApi.schedule>[1],
                options,
            ),
    },
    {
        ...{
            id: 'case-instruction-blocks.create',
            resource: 'case-instruction-blocks',
            method: 'create',
            verb: 'POST',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'instructionId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'type',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: ['text', 'photo'],
                        },
                        {
                            name: 'variantId',
                            optional: true,
                            nullable: true,
                            kind: 'number',
                        },
                        {
                            name: 'contentJson',
                            optional: true,
                            nullable: true,
                            kind: 'json',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            caseInstructionBlocksApi.create(
                args[0] as Parameters<
                    typeof caseInstructionBlocksApi.create
                >[0],
                options,
            ),
    },
    {
        ...{
            id: 'case-instruction-blocks.listByInstruction',
            resource: 'case-instruction-blocks',
            method: 'listByInstruction',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'instructionId',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            caseInstructionBlocksApi.listByInstruction(
                args[0] as Parameters<
                    typeof caseInstructionBlocksApi.listByInstruction
                >[0],
                args[1] as Parameters<
                    typeof caseInstructionBlocksApi.listByInstruction
                >[1],
                options,
            ),
    },
    {
        ...{
            id: 'case-instruction-blocks.update',
            resource: 'case-instruction-blocks',
            method: 'update',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'type',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['text', 'photo'],
                        },
                        {
                            name: 'contentJson',
                            optional: true,
                            nullable: true,
                            kind: 'json',
                        },
                        {
                            name: 'variantId',
                            optional: true,
                            nullable: true,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            caseInstructionBlocksApi.update(
                args[0] as Parameters<
                    typeof caseInstructionBlocksApi.update
                >[0],
                args[1] as Parameters<
                    typeof caseInstructionBlocksApi.update
                >[1],
                options,
            ),
    },
    {
        ...{
            id: 'case-instruction-blocks.reorder',
            resource: 'case-instruction-blocks',
            method: 'reorder',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'direction',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: ['up', 'down'],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            caseInstructionBlocksApi.reorder(
                args[0] as Parameters<
                    typeof caseInstructionBlocksApi.reorder
                >[0],
                args[1] as Parameters<
                    typeof caseInstructionBlocksApi.reorder
                >[1],
                options,
            ),
    },
    {
        ...{
            id: 'case-instruction-blocks.remove',
            resource: 'case-instruction-blocks',
            method: 'remove',
            verb: 'DELETE',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            caseInstructionBlocksApi.remove(
                args[0] as Parameters<
                    typeof caseInstructionBlocksApi.remove
                >[0],
                options,
            ),
    },
    {
        ...{
            id: 'case-instructions.create',
            resource: 'case-instructions',
            method: 'create',
            verb: 'POST',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'title',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'description',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'headerVariantId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'lan',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: ['UA', 'PL', 'EN', 'RU'],
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['draft', 'active', 'archived'],
                        },
                        {
                            name: 'isPopular',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            caseInstructionsApi.create(
                args[0] as Parameters<typeof caseInstructionsApi.create>[0],
                options,
            ),
    },
    {
        ...{
            id: 'case-instructions.list',
            resource: 'case-instructions',
            method: 'list',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['draft', 'active', 'archived'],
                        },
                        {
                            name: 'lan',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['UA', 'PL', 'EN', 'RU'],
                        },
                        {
                            name: 'isPopular',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            caseInstructionsApi.list(
                args[0] as Parameters<typeof caseInstructionsApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'case-instructions.getById',
            resource: 'case-instructions',
            method: 'getById',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            caseInstructionsApi.getById(
                args[0] as Parameters<typeof caseInstructionsApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'case-instructions.update',
            resource: 'case-instructions',
            method: 'update',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'title',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'description',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'headerVariantId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'lan',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['UA', 'PL', 'EN', 'RU'],
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['draft', 'active', 'archived'],
                        },
                        {
                            name: 'isPopular',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            caseInstructionsApi.update(
                args[0] as Parameters<typeof caseInstructionsApi.update>[0],
                args[1] as Parameters<typeof caseInstructionsApi.update>[1],
                options,
            ),
    },
    {
        ...{
            id: 'case-instructions.remove',
            resource: 'case-instructions',
            method: 'remove',
            verb: 'DELETE',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            caseInstructionsApi.remove(
                args[0] as Parameters<typeof caseInstructionsApi.remove>[0],
                options,
            ),
    },
    {
        ...{
            id: 'case-reminders.create',
            resource: 'case-reminders',
            method: 'create',
            verb: 'POST',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'lan',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: ['UA', 'PL', 'EN', 'RU'],
                        },
                        {
                            name: 'topic',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'text',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'sendInApp',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                        {
                            name: 'sendEmail',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            caseRemindersApi.create(
                args[0] as Parameters<typeof caseRemindersApi.create>[0],
                options,
            ),
    },
    {
        ...{
            id: 'case-reminders.list',
            resource: 'case-reminders',
            method: 'list',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'lan',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['UA', 'PL', 'EN', 'RU'],
                        },
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            caseRemindersApi.list(
                args[0] as Parameters<typeof caseRemindersApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'case-reminders.getById',
            resource: 'case-reminders',
            method: 'getById',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            caseRemindersApi.getById(
                args[0] as Parameters<typeof caseRemindersApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'case-reminders.remove',
            resource: 'case-reminders',
            method: 'remove',
            verb: 'DELETE',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            caseRemindersApi.remove(
                args[0] as Parameters<typeof caseRemindersApi.remove>[0],
                options,
            ),
    },
    {
        ...{
            id: 'case-reminders.update',
            resource: 'case-reminders',
            method: 'update',
            verb: 'PATCH',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'lan',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['UA', 'PL', 'EN', 'RU'],
                        },
                        {
                            name: 'topic',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'text',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'sendInApp',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                        {
                            name: 'sendEmail',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            caseRemindersApi.update(
                args[0] as Parameters<typeof caseRemindersApi.update>[0],
                args[1] as Parameters<typeof caseRemindersApi.update>[1],
                options,
            ),
    },
    {
        ...{
            id: 'case-stage-tasks.create',
            resource: 'case-stage-tasks',
            method: 'create',
            verb: 'POST',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'stageId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'lan',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: ['UA', 'PL', 'EN', 'RU'],
                        },
                        {
                            name: 'title',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'subtitle',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'type',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: ['with_date', 'info', 'text'],
                        },
                        {
                            name: 'iconId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'instructionId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'reminderId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            caseStageTasksApi.create(
                args[0] as Parameters<typeof caseStageTasksApi.create>[0],
                options,
            ),
    },
    {
        ...{
            id: 'case-stage-tasks.listByStage',
            resource: 'case-stage-tasks',
            method: 'listByStage',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'stageId',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            caseStageTasksApi.listByStage(
                args[0] as Parameters<typeof caseStageTasksApi.listByStage>[0],
                args[1] as Parameters<typeof caseStageTasksApi.listByStage>[1],
                options,
            ),
    },
    {
        ...{
            id: 'case-stage-tasks.update',
            resource: 'case-stage-tasks',
            method: 'update',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'type',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['with_date', 'info', 'text'],
                        },
                        {
                            name: 'title',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'lan',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['UA', 'PL', 'EN', 'RU'],
                        },
                        {
                            name: 'instructionId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'subtitle',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'iconId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'reminderId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            caseStageTasksApi.update(
                args[0] as Parameters<typeof caseStageTasksApi.update>[0],
                args[1] as Parameters<typeof caseStageTasksApi.update>[1],
                options,
            ),
    },
    {
        ...{
            id: 'case-stage-tasks.reorder',
            resource: 'case-stage-tasks',
            method: 'reorder',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'direction',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: ['up', 'down'],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            caseStageTasksApi.reorder(
                args[0] as Parameters<typeof caseStageTasksApi.reorder>[0],
                args[1] as Parameters<typeof caseStageTasksApi.reorder>[1],
                options,
            ),
    },
    {
        ...{
            id: 'case-stage-tasks.remove',
            resource: 'case-stage-tasks',
            method: 'remove',
            verb: 'DELETE',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            caseStageTasksApi.remove(
                args[0] as Parameters<typeof caseStageTasksApi.remove>[0],
                options,
            ),
    },
    {
        ...{
            id: 'case-stages.create',
            resource: 'case-stages',
            method: 'create',
            verb: 'POST',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'caseId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'lan',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: ['UA', 'PL', 'EN', 'RU'],
                        },
                        {
                            name: 'title',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'iconId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            caseStagesApi.create(
                args[0] as Parameters<typeof caseStagesApi.create>[0],
                options,
            ),
    },
    {
        ...{
            id: 'case-stages.listByCase',
            resource: 'case-stages',
            method: 'listByCase',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'caseId',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            caseStagesApi.listByCase(
                args[0] as Parameters<typeof caseStagesApi.listByCase>[0],
                args[1] as Parameters<typeof caseStagesApi.listByCase>[1],
                options,
            ),
    },
    {
        ...{
            id: 'case-stages.update',
            resource: 'case-stages',
            method: 'update',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'title',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'lan',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['UA', 'PL', 'EN', 'RU'],
                        },
                        {
                            name: 'iconId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            caseStagesApi.update(
                args[0] as Parameters<typeof caseStagesApi.update>[0],
                args[1] as Parameters<typeof caseStagesApi.update>[1],
                options,
            ),
    },
    {
        ...{
            id: 'case-stages.reorder',
            resource: 'case-stages',
            method: 'reorder',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'direction',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: ['up', 'down'],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            caseStagesApi.reorder(
                args[0] as Parameters<typeof caseStagesApi.reorder>[0],
                args[1] as Parameters<typeof caseStagesApi.reorder>[1],
                options,
            ),
    },
    {
        ...{
            id: 'case-stages.remove',
            resource: 'case-stages',
            method: 'remove',
            verb: 'DELETE',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            caseStagesApi.remove(
                args[0] as Parameters<typeof caseStagesApi.remove>[0],
                options,
            ),
    },
    {
        ...{
            id: 'case-types.create',
            resource: 'case-types',
            method: 'create',
            verb: 'POST',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'title',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'description',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'iconId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['active', 'draft', 'archived'],
                        },
                        {
                            name: 'isPopular',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                        {
                            name: 'lan',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: ['UA', 'PL', 'EN', 'RU'],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            caseTypesApi.create(
                args[0] as Parameters<typeof caseTypesApi.create>[0],
                options,
            ),
    },
    {
        ...{
            id: 'case-types.list',
            resource: 'case-types',
            method: 'list',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['active', 'draft', 'archived'],
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'isPopular',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                        {
                            name: 'lan',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['UA', 'PL', 'EN', 'RU'],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            caseTypesApi.list(
                args[0] as Parameters<typeof caseTypesApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'case-types.getById',
            resource: 'case-types',
            method: 'getById',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            caseTypesApi.getById(
                args[0] as Parameters<typeof caseTypesApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'case-types.update',
            resource: 'case-types',
            method: 'update',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'title',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'description',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'iconId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['active', 'draft', 'archived'],
                        },
                        {
                            name: 'isPopular',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                        {
                            name: 'lan',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['UA', 'PL', 'EN', 'RU'],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            caseTypesApi.update(
                args[0] as Parameters<typeof caseTypesApi.update>[0],
                args[1] as Parameters<typeof caseTypesApi.update>[1],
                options,
            ),
    },
    {
        ...{
            id: 'case-types.remove',
            resource: 'case-types',
            method: 'remove',
            verb: 'DELETE',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            caseTypesApi.remove(
                args[0] as Parameters<typeof caseTypesApi.remove>[0],
                options,
            ),
    },
    {
        ...{
            id: 'cases.create',
            resource: 'cases',
            method: 'create',
            verb: 'POST',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'title',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'typeId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'lan',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: ['UA', 'PL', 'EN', 'RU'],
                        },
                        {
                            name: 'subtitle',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'iconId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['draft', 'active', 'archived'],
                        },
                        {
                            name: 'isPopular',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            casesApi.create(
                args[0] as Parameters<typeof casesApi.create>[0],
                options,
            ),
    },
    {
        ...{
            id: 'cases.list',
            resource: 'cases',
            method: 'list',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['draft', 'active', 'archived'],
                        },
                        {
                            name: 'lan',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['UA', 'PL', 'EN', 'RU'],
                        },
                        {
                            name: 'isPopular',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                        {
                            name: 'typeId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            casesApi.list(
                args[0] as Parameters<typeof casesApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'cases.getById',
            resource: 'cases',
            method: 'getById',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            casesApi.getById(
                args[0] as Parameters<typeof casesApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'cases.update',
            resource: 'cases',
            method: 'update',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'title',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'typeId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'lan',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['UA', 'PL', 'EN', 'RU'],
                        },
                        {
                            name: 'subtitle',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'iconId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['draft', 'active', 'archived'],
                        },
                        {
                            name: 'isPopular',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            casesApi.update(
                args[0] as Parameters<typeof casesApi.update>[0],
                args[1] as Parameters<typeof casesApi.update>[1],
                options,
            ),
    },
    {
        ...{
            id: 'cases.remove',
            resource: 'cases',
            method: 'remove',
            verb: 'DELETE',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            casesApi.remove(
                args[0] as Parameters<typeof casesApi.remove>[0],
                options,
            ),
    },
    {
        ...{
            id: 'cases.copy',
            resource: 'cases',
            method: 'copy',
            verb: 'POST',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            casesApi.copy(
                args[0] as Parameters<typeof casesApi.copy>[0],
                options,
            ),
    },
    {
        ...{
            id: 'consultation-bookings.retryOperations',
            resource: 'consultation-bookings',
            method: 'retryOperations',
            verb: 'POST',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            consultationBookingsApi.retryOperations(
                args[0] as Parameters<
                    typeof consultationBookingsApi.retryOperations
                >[0],
                options,
            ),
    },
    {
        ...{
            id: 'consultation-bookings.cancelByAdmin',
            resource: 'consultation-bookings',
            method: 'cancelByAdmin',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            consultationBookingsApi.cancelByAdmin(
                args[0] as Parameters<
                    typeof consultationBookingsApi.cancelByAdmin
                >[0],
                options,
            ),
    },
    {
        ...{
            id: 'consultation-bookings.list',
            resource: 'consultation-bookings',
            method: 'list',
            verb: 'GET',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'userId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'specialistId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: [
                                'awaiting_payment',
                                'paid',
                                'canceled',
                                'completed',
                                'no_show',
                                'refunded',
                            ],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            consultationBookingsApi.list(
                args[0] as Parameters<typeof consultationBookingsApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'consultation-bookings.getById',
            resource: 'consultation-bookings',
            method: 'getById',
            verb: 'GET',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            consultationBookingsApi.getById(
                args[0] as Parameters<
                    typeof consultationBookingsApi.getById
                >[0],
                options,
            ),
    },
    {
        ...{
            id: 'consultation-bookings.download',
            resource: 'consultation-bookings',
            method: 'download',
            verb: 'GET',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            consultationBookingsApi.download(
                args[0] as Parameters<
                    typeof consultationBookingsApi.download
                >[0],
                options,
            ),
    },
    {
        ...{
            id: 'consultation-categories.list',
            resource: 'consultation-categories',
            method: 'list',
            verb: 'GET',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'isActive',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                        {
                            name: 'isPopular',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            consultationCategoriesApi.list(
                args[0] as Parameters<typeof consultationCategoriesApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'consultation-categories.getById',
            resource: 'consultation-categories',
            method: 'getById',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            consultationCategoriesApi.getById(
                args[0] as Parameters<
                    typeof consultationCategoriesApi.getById
                >[0],
                options,
            ),
    },
    {
        ...{
            id: 'consultation-categories.create',
            resource: 'consultation-categories',
            method: 'create',
            verb: 'POST',
            roles: ['admin'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'titleUa',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'titlePl',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'titleEn',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'titleRu',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'assetId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'isActive',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                        {
                            name: 'isPopular',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            consultationCategoriesApi.create(
                args[0] as Parameters<
                    typeof consultationCategoriesApi.create
                >[0],
                options,
            ),
    },
    {
        ...{
            id: 'consultation-categories.update',
            resource: 'consultation-categories',
            method: 'update',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'titleUa',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'titlePl',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'titleEn',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'titleRu',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'assetId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'isActive',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                        {
                            name: 'isPopular',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            consultationCategoriesApi.update(
                args[0] as Parameters<
                    typeof consultationCategoriesApi.update
                >[0],
                args[1] as Parameters<
                    typeof consultationCategoriesApi.update
                >[1],
                options,
            ),
    },
    {
        ...{
            id: 'consultation-categories.remove',
            resource: 'consultation-categories',
            method: 'remove',
            verb: 'DELETE',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            consultationCategoriesApi.remove(
                args[0] as Parameters<
                    typeof consultationCategoriesApi.remove
                >[0],
                options,
            ),
    },
    {
        ...{
            id: 'consultation-reviews.list',
            resource: 'consultation-reviews',
            method: 'list',
            verb: 'GET',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'userId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'specialistId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'consultationBookingId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: [
                                'pending_moderation',
                                'published',
                                'rejected',
                            ],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            consultationReviewsApi.list(
                args[0] as Parameters<typeof consultationReviewsApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'consultation-reviews.getById',
            resource: 'consultation-reviews',
            method: 'getById',
            verb: 'GET',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            consultationReviewsApi.getById(
                args[0] as Parameters<typeof consultationReviewsApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'consultation-reviews.approve',
            resource: 'consultation-reviews',
            method: 'approve',
            verb: 'PATCH',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            consultationReviewsApi.approve(
                args[0] as Parameters<typeof consultationReviewsApi.approve>[0],
                options,
            ),
    },
    {
        ...{
            id: 'consultation-reviews.reject',
            resource: 'consultation-reviews',
            method: 'reject',
            verb: 'PATCH',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'rejectionReason',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            consultationReviewsApi.reject(
                args[0] as Parameters<typeof consultationReviewsApi.reject>[0],
                args[1] as Parameters<typeof consultationReviewsApi.reject>[1],
                options,
            ),
    },
    {
        ...{
            id: 'specialist-consultations.list',
            resource: 'specialist-consultations',
            method: 'list',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'consultationCategoryId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'specialistId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: [
                                'draft',
                                'active',
                                'inactive',
                                'archived',
                            ],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            specialistConsultationsApi.list(
                args[0] as Parameters<
                    typeof specialistConsultationsApi.list
                >[0],
                options,
            ),
    },
    {
        ...{
            id: 'specialist-consultations.getById',
            resource: 'specialist-consultations',
            method: 'getById',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            specialistConsultationsApi.getById(
                args[0] as Parameters<
                    typeof specialistConsultationsApi.getById
                >[0],
                options,
            ),
    },
    {
        ...{
            id: 'g-doc-templates.list',
            resource: 'g-doc-templates',
            method: 'list',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'gDocTypeId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['active', 'inactive'],
                        },
                        {
                            name: 'search',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            gDocTemplatesApi.list(
                args[0] as Parameters<typeof gDocTemplatesApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'g-doc-templates.getById',
            resource: 'g-doc-templates',
            method: 'getById',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            gDocTemplatesApi.getById(
                args[0] as Parameters<typeof gDocTemplatesApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'g-doc-templates.create',
            resource: 'g-doc-templates',
            method: 'create',
            verb: 'POST',
            roles: ['admin'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'gDocTypeId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'iconId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'assetId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'titleUA',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'titlePL',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'titleEN',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'titleRU',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['active', 'inactive'],
                        },
                        {
                            name: 'variableIds',
                            optional: true,
                            nullable: false,
                            kind: 'array',
                            item: {
                                name: 'item',
                                optional: false,
                                nullable: false,
                                kind: 'number',
                            },
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            gDocTemplatesApi.create(
                args[0] as Parameters<typeof gDocTemplatesApi.create>[0],
                options,
            ),
    },
    {
        ...{
            id: 'g-doc-templates.update',
            resource: 'g-doc-templates',
            method: 'update',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'gDocTypeId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'iconId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'assetId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'titleUA',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'titlePL',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'titleEN',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'titleRU',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['active', 'inactive'],
                        },
                        {
                            name: 'variableIds',
                            optional: true,
                            nullable: false,
                            kind: 'array',
                            item: {
                                name: 'item',
                                optional: false,
                                nullable: false,
                                kind: 'number',
                            },
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            gDocTemplatesApi.update(
                args[0] as Parameters<typeof gDocTemplatesApi.update>[0],
                args[1] as Parameters<typeof gDocTemplatesApi.update>[1],
                options,
            ),
    },
    {
        ...{
            id: 'g-doc-templates.remove',
            resource: 'g-doc-templates',
            method: 'remove',
            verb: 'DELETE',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            gDocTemplatesApi.remove(
                args[0] as Parameters<typeof gDocTemplatesApi.remove>[0],
                options,
            ),
    },
    {
        ...{
            id: 'g-doc-types.list',
            resource: 'g-doc-types',
            method: 'list',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['active', 'inactive'],
                        },
                        {
                            name: 'isPopular',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                        {
                            name: 'search',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            gDocTypesApi.list(
                args[0] as Parameters<typeof gDocTypesApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'g-doc-types.getById',
            resource: 'g-doc-types',
            method: 'getById',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            gDocTypesApi.getById(
                args[0] as Parameters<typeof gDocTypesApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'g-doc-types.create',
            resource: 'g-doc-types',
            method: 'create',
            verb: 'POST',
            roles: ['admin'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'iconId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'titleUA',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'titlePL',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'titleEN',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'titleRU',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'isPopular',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['active', 'inactive'],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            gDocTypesApi.create(
                args[0] as Parameters<typeof gDocTypesApi.create>[0],
                options,
            ),
    },
    {
        ...{
            id: 'g-doc-types.update',
            resource: 'g-doc-types',
            method: 'update',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'iconId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'titleUA',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'titlePL',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'titleEN',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'titleRU',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'isPopular',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['active', 'inactive'],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            gDocTypesApi.update(
                args[0] as Parameters<typeof gDocTypesApi.update>[0],
                args[1] as Parameters<typeof gDocTypesApi.update>[1],
                options,
            ),
    },
    {
        ...{
            id: 'g-doc-types.remove',
            resource: 'g-doc-types',
            method: 'remove',
            verb: 'DELETE',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            gDocTypesApi.remove(
                args[0] as Parameters<typeof gDocTypesApi.remove>[0],
                options,
            ),
    },
    {
        ...{
            id: 'g-doc-vars.list',
            resource: 'g-doc-vars',
            method: 'list',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'search',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            gDocVarsApi.list(
                args[0] as Parameters<typeof gDocVarsApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'g-doc-vars.getById',
            resource: 'g-doc-vars',
            method: 'getById',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            gDocVarsApi.getById(
                args[0] as Parameters<typeof gDocVarsApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'g-doc-vars.create',
            resource: 'g-doc-vars',
            method: 'create',
            verb: 'POST',
            roles: ['admin'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'key',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'labelUA',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'labelPL',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'labelEN',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'labelRU',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            gDocVarsApi.create(
                args[0] as Parameters<typeof gDocVarsApi.create>[0],
                options,
            ),
    },
    {
        ...{
            id: 'g-doc-vars.remove',
            resource: 'g-doc-vars',
            method: 'remove',
            verb: 'DELETE',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            gDocVarsApi.remove(
                args[0] as Parameters<typeof gDocVarsApi.remove>[0],
                options,
            ),
    },
    {
        ...{
            id: 'legal-document-versions.list',
            resource: 'legal-document-versions',
            method: 'list',
            verb: 'GET',
            roles: ['admin'],
            args: [
                {
                    name: 'code',
                    kind: 'enum',
                    optional: false,
                    nullable: false,
                    choices: [
                        'registration_terms',
                        'privacy_policy',
                        'subscription_terms',
                        'consultation_terms',
                        'specialist_terms',
                        'partner_terms',
                    ],
                },
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            legalDocumentVersionsApi.list(
                args[0] as Parameters<typeof legalDocumentVersionsApi.list>[0],
                args[1] as Parameters<typeof legalDocumentVersionsApi.list>[1],
                options,
            ),
    },
    {
        ...{
            id: 'legal-document-versions.create',
            resource: 'legal-document-versions',
            method: 'create',
            verb: 'POST',
            roles: ['admin'],
            args: [
                {
                    name: 'code',
                    kind: 'enum',
                    optional: false,
                    nullable: false,
                    choices: [
                        'registration_terms',
                        'privacy_policy',
                        'subscription_terms',
                        'consultation_terms',
                        'specialist_terms',
                        'partner_terms',
                    ],
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'isPlaceholder',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                    ],
                },
                {
                    name: 'file',
                    optional: false,
                    nullable: false,
                    kind: 'file',
                },
            ],
        },
        execute: (args, options) =>
            legalDocumentVersionsApi.create(
                args[0] as Parameters<
                    typeof legalDocumentVersionsApi.create
                >[0],
                args[1] as Parameters<
                    typeof legalDocumentVersionsApi.create
                >[1],
                args[2] as Parameters<
                    typeof legalDocumentVersionsApi.create
                >[2],
                options,
            ),
    },
    {
        ...{
            id: 'legal-document-versions.publish',
            resource: 'legal-document-versions',
            method: 'publish',
            verb: 'POST',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            legalDocumentVersionsApi.publish(
                args[0] as Parameters<
                    typeof legalDocumentVersionsApi.publish
                >[0],
                options,
            ),
    },
    {
        ...{
            id: 'legal-document-versions.downloadDraft',
            resource: 'legal-document-versions',
            method: 'downloadDraft',
            verb: 'GET',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            legalDocumentVersionsApi.downloadDraft(
                args[0] as Parameters<
                    typeof legalDocumentVersionsApi.downloadDraft
                >[0],
                options,
            ),
    },
    {
        ...{
            id: 'legal-documents.list',
            resource: 'legal-documents',
            method: 'list',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'placement',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: [
                                'registration',
                                'subscription_checkout',
                                'consultation_checkout',
                                'specialist',
                                'partner',
                            ],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            legalDocumentsApi.list(
                args[0] as Parameters<typeof legalDocumentsApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'legal-documents.getById',
            resource: 'legal-documents',
            method: 'getById',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'code',
                    kind: 'enum',
                    optional: false,
                    nullable: false,
                    choices: [
                        'registration_terms',
                        'privacy_policy',
                        'subscription_terms',
                        'consultation_terms',
                        'specialist_terms',
                        'partner_terms',
                    ],
                },
            ],
        },
        execute: (args, options) =>
            legalDocumentsApi.getById(
                args[0] as Parameters<typeof legalDocumentsApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'legal-documents.download',
            resource: 'legal-documents',
            method: 'download',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'versionId',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            legalDocumentsApi.download(
                args[0] as Parameters<typeof legalDocumentsApi.download>[0],
                options,
            ),
    },
    {
        ...{
            id: 'mail-accounts.list',
            resource: 'mail-accounts',
            method: 'list',
            verb: 'GET',
            roles: ['writer'],
            args: [],
        },
        execute: (args, options) => mailAccountsApi.list(options),
    },
    {
        ...{
            id: 'mail-accounts.getById',
            resource: 'mail-accounts',
            method: 'getById',
            verb: 'GET',
            roles: ['writer'],
            args: [
                {
                    name: 'account',
                    kind: 'enum',
                    optional: false,
                    nullable: false,
                    choices: ['RESIDDY_APP', 'RESIDDY_CONTACT'],
                },
            ],
        },
        execute: (args, options) =>
            mailAccountsApi.getById(
                args[0] as Parameters<typeof mailAccountsApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'mail-jobs.create',
            resource: 'mail-jobs',
            method: 'create',
            verb: 'POST',
            roles: ['writer'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'signatureId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'title',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'account',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: ['RESIDDY_APP', 'RESIDDY_CONTACT'],
                        },
                        {
                            name: 'subject',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'html',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'text',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'audience',
                            optional: true,
                            nullable: false,
                            kind: 'object',
                            fields: [
                                {
                                    name: 'accountTypes',
                                    optional: true,
                                    nullable: false,
                                    kind: 'array',
                                    item: {
                                        name: 'item',
                                        kind: 'enum',
                                        optional: false,
                                        nullable: false,
                                        choices: [
                                            'USERS',
                                            'MANAGERS',
                                            'PARTNERS',
                                            'SPECIALISTS',
                                        ],
                                    },
                                },
                                {
                                    name: 'language',
                                    optional: true,
                                    nullable: false,
                                    kind: 'array',
                                    item: {
                                        name: 'item',
                                        kind: 'enum',
                                        optional: false,
                                        nullable: false,
                                        choices: ['UA', 'PL', 'EN', 'RU'],
                                    },
                                },
                                {
                                    name: 'status',
                                    optional: true,
                                    nullable: false,
                                    kind: 'array',
                                    item: {
                                        name: 'item',
                                        kind: 'enum',
                                        optional: false,
                                        nullable: false,
                                        choices: [
                                            'active',
                                            'pending',
                                            'blocked',
                                            'archived',
                                        ],
                                    },
                                },
                            ],
                        },
                        {
                            name: 'attachments',
                            optional: true,
                            nullable: false,
                            kind: 'array',
                            item: {
                                name: 'item',
                                optional: false,
                                nullable: false,
                                kind: 'object',
                                fields: [
                                    {
                                        name: 'mediaAssetId',
                                        optional: false,
                                        nullable: false,
                                        kind: 'number',
                                    },
                                    {
                                        name: 'filename',
                                        optional: true,
                                        nullable: false,
                                        kind: 'string',
                                    },
                                ],
                            },
                        },
                        {
                            name: 'inlineImages',
                            optional: true,
                            nullable: false,
                            kind: 'array',
                            item: {
                                name: 'item',
                                optional: false,
                                nullable: false,
                                kind: 'object',
                                fields: [
                                    {
                                        name: 'mediaAssetId',
                                        optional: false,
                                        nullable: false,
                                        kind: 'number',
                                    },
                                    {
                                        name: 'cid',
                                        optional: false,
                                        nullable: false,
                                        kind: 'string',
                                    },
                                ],
                            },
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            mailJobsApi.create(
                args[0] as Parameters<typeof mailJobsApi.create>[0],
                options,
            ),
    },
    {
        ...{
            id: 'mail-jobs.list',
            resource: 'mail-jobs',
            method: 'list',
            verb: 'GET',
            roles: ['writer'],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: [
                                'draft',
                                'scheduled',
                                'running',
                                'done',
                                'cancelled',
                            ],
                        },
                        {
                            name: 'account',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['RESIDDY_APP', 'RESIDDY_CONTACT'],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            mailJobsApi.list(
                args[0] as Parameters<typeof mailJobsApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'mail-jobs.getById',
            resource: 'mail-jobs',
            method: 'getById',
            verb: 'GET',
            roles: ['writer'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            mailJobsApi.getById(
                args[0] as Parameters<typeof mailJobsApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'mail-jobs.update',
            resource: 'mail-jobs',
            method: 'update',
            verb: 'PATCH',
            roles: ['writer'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'signatureId',
                            optional: true,
                            nullable: true,
                            kind: 'number',
                        },
                        {
                            name: 'title',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'subject',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'html',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'text',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'audience',
                            optional: true,
                            nullable: false,
                            kind: 'object',
                            fields: [
                                {
                                    name: 'accountTypes',
                                    optional: true,
                                    nullable: false,
                                    kind: 'array',
                                    item: {
                                        name: 'item',
                                        kind: 'enum',
                                        optional: false,
                                        nullable: false,
                                        choices: [
                                            'USERS',
                                            'MANAGERS',
                                            'PARTNERS',
                                            'SPECIALISTS',
                                        ],
                                    },
                                },
                                {
                                    name: 'language',
                                    optional: true,
                                    nullable: false,
                                    kind: 'array',
                                    item: {
                                        name: 'item',
                                        kind: 'enum',
                                        optional: false,
                                        nullable: false,
                                        choices: ['UA', 'PL', 'EN', 'RU'],
                                    },
                                },
                                {
                                    name: 'status',
                                    optional: true,
                                    nullable: false,
                                    kind: 'array',
                                    item: {
                                        name: 'item',
                                        kind: 'enum',
                                        optional: false,
                                        nullable: false,
                                        choices: [
                                            'active',
                                            'pending',
                                            'blocked',
                                            'archived',
                                        ],
                                    },
                                },
                            ],
                        },
                        {
                            name: 'attachments',
                            optional: true,
                            nullable: false,
                            kind: 'array',
                            item: {
                                name: 'item',
                                optional: false,
                                nullable: false,
                                kind: 'object',
                                fields: [
                                    {
                                        name: 'mediaAssetId',
                                        optional: false,
                                        nullable: false,
                                        kind: 'number',
                                    },
                                    {
                                        name: 'filename',
                                        optional: true,
                                        nullable: false,
                                        kind: 'string',
                                    },
                                ],
                            },
                        },
                        {
                            name: 'inlineImages',
                            optional: true,
                            nullable: false,
                            kind: 'array',
                            item: {
                                name: 'item',
                                optional: false,
                                nullable: false,
                                kind: 'object',
                                fields: [
                                    {
                                        name: 'mediaAssetId',
                                        optional: false,
                                        nullable: false,
                                        kind: 'number',
                                    },
                                    {
                                        name: 'cid',
                                        optional: false,
                                        nullable: false,
                                        kind: 'string',
                                    },
                                ],
                            },
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            mailJobsApi.update(
                args[0] as Parameters<typeof mailJobsApi.update>[0],
                args[1] as Parameters<typeof mailJobsApi.update>[1],
                options,
            ),
    },
    {
        ...{
            id: 'mail-jobs.schedule',
            resource: 'mail-jobs',
            method: 'schedule',
            verb: 'POST',
            roles: ['writer'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'deliverAt',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            mailJobsApi.schedule(
                args[0] as Parameters<typeof mailJobsApi.schedule>[0],
                args[1] as Parameters<typeof mailJobsApi.schedule>[1],
                options,
            ),
    },
    {
        ...{
            id: 'mail-jobs.cancel',
            resource: 'mail-jobs',
            method: 'cancel',
            verb: 'POST',
            roles: ['writer'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            mailJobsApi.cancel(
                args[0] as Parameters<typeof mailJobsApi.cancel>[0],
                options,
            ),
    },
    {
        ...{
            id: 'mail-jobs.progress',
            resource: 'mail-jobs',
            method: 'progress',
            verb: 'GET',
            roles: ['writer'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            mailJobsApi.progress(
                args[0] as Parameters<typeof mailJobsApi.progress>[0],
                options,
            ),
    },
    {
        ...{
            id: 'mail-jobs.build',
            resource: 'mail-jobs',
            method: 'build',
            verb: 'POST',
            roles: ['writer'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            mailJobsApi.build(
                args[0] as Parameters<typeof mailJobsApi.build>[0],
                options,
            ),
    },
    {
        ...{
            id: 'mail-jobs.tick',
            resource: 'mail-jobs',
            method: 'tick',
            verb: 'POST',
            roles: ['writer'],
            args: [],
        },
        execute: (args, options) => mailJobsApi.tick(options),
    },
    {
        ...{
            id: 'mail-queue.tick',
            resource: 'mail-queue',
            method: 'tick',
            verb: 'POST',
            roles: ['writer'],
            args: [],
        },
        execute: (args, options) => mailQueueApi.tick(options),
    },
    {
        ...{
            id: 'mail-signatures.create',
            resource: 'mail-signatures',
            method: 'create',
            verb: 'POST',
            roles: ['writer'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'title',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'companyName',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'text',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'address',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'email',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'website',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'logoAssetId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            mailSignaturesApi.create(
                args[0] as Parameters<typeof mailSignaturesApi.create>[0],
                options,
            ),
    },
    {
        ...{
            id: 'mail-signatures.list',
            resource: 'mail-signatures',
            method: 'list',
            verb: 'GET',
            roles: ['writer'],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'isPopular',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            mailSignaturesApi.list(
                args[0] as Parameters<typeof mailSignaturesApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'mail-signatures.getById',
            resource: 'mail-signatures',
            method: 'getById',
            verb: 'GET',
            roles: ['writer'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            mailSignaturesApi.getById(
                args[0] as Parameters<typeof mailSignaturesApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'mail-signatures.update',
            resource: 'mail-signatures',
            method: 'update',
            verb: 'PATCH',
            roles: ['writer'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'title',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'companyName',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'text',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'address',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'email',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'website',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'logoAssetId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'isPopular',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            mailSignaturesApi.update(
                args[0] as Parameters<typeof mailSignaturesApi.update>[0],
                args[1] as Parameters<typeof mailSignaturesApi.update>[1],
                options,
            ),
    },
    {
        ...{
            id: 'mail-signatures.remove',
            resource: 'mail-signatures',
            method: 'remove',
            verb: 'DELETE',
            roles: ['writer'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            mailSignaturesApi.remove(
                args[0] as Parameters<typeof mailSignaturesApi.remove>[0],
                options,
            ),
    },
    {
        ...{
            id: 'mail-snippets.create',
            resource: 'mail-snippets',
            method: 'create',
            verb: 'POST',
            roles: ['writer'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'title',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'topic',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'text',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            mailSnippetsApi.create(
                args[0] as Parameters<typeof mailSnippetsApi.create>[0],
                options,
            ),
    },
    {
        ...{
            id: 'mail-snippets.list',
            resource: 'mail-snippets',
            method: 'list',
            verb: 'GET',
            roles: ['writer'],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'isPopular',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            mailSnippetsApi.list(
                args[0] as Parameters<typeof mailSnippetsApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'mail-snippets.getById',
            resource: 'mail-snippets',
            method: 'getById',
            verb: 'GET',
            roles: ['writer'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            mailSnippetsApi.getById(
                args[0] as Parameters<typeof mailSnippetsApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'mail-snippets.update',
            resource: 'mail-snippets',
            method: 'update',
            verb: 'PATCH',
            roles: ['writer'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'title',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'topic',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'text',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'isPopular',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            mailSnippetsApi.update(
                args[0] as Parameters<typeof mailSnippetsApi.update>[0],
                args[1] as Parameters<typeof mailSnippetsApi.update>[1],
                options,
            ),
    },
    {
        ...{
            id: 'mail-snippets.remove',
            resource: 'mail-snippets',
            method: 'remove',
            verb: 'DELETE',
            roles: ['writer'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            mailSnippetsApi.remove(
                args[0] as Parameters<typeof mailSnippetsApi.remove>[0],
                options,
            ),
    },
    {
        ...{
            id: 'mail.send',
            resource: 'mail',
            method: 'send',
            verb: 'POST',
            roles: ['writer'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'signatureId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'account',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: ['RESIDDY_APP', 'RESIDDY_CONTACT'],
                        },
                        {
                            name: 'toEmail',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'subject',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'html',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'text',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'attachments',
                            optional: true,
                            nullable: false,
                            kind: 'array',
                            item: {
                                name: 'item',
                                optional: false,
                                nullable: false,
                                kind: 'object',
                                fields: [
                                    {
                                        name: 'mediaAssetId',
                                        optional: false,
                                        nullable: false,
                                        kind: 'number',
                                    },
                                    {
                                        name: 'filename',
                                        optional: true,
                                        nullable: false,
                                        kind: 'string',
                                    },
                                ],
                            },
                        },
                        {
                            name: 'inlineCidImages',
                            optional: true,
                            nullable: false,
                            kind: 'array',
                            item: {
                                name: 'item',
                                optional: false,
                                nullable: false,
                                kind: 'object',
                                fields: [
                                    {
                                        name: 'cid',
                                        optional: false,
                                        nullable: false,
                                        kind: 'string',
                                    },
                                    {
                                        name: 'mediaAssetId',
                                        optional: false,
                                        nullable: false,
                                        kind: 'number',
                                    },
                                ],
                            },
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            mailApi.send(
                args[0] as Parameters<typeof mailApi.send>[0],
                options,
            ),
    },
    {
        ...{
            id: 'managers.register',
            resource: 'managers',
            method: 'register',
            verb: 'POST',
            roles: ['admin'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'email',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'password',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            managersApi.register(
                args[0] as Parameters<typeof managersApi.register>[0],
                options,
            ),
    },
    {
        ...{
            id: 'managers.getMe',
            resource: 'managers',
            method: 'getMe',
            verb: 'GET',
            roles: [],
            args: [],
        },
        execute: (args, options) => managersApi.getMe(options),
    },
    {
        ...{
            id: 'managers.updateMe',
            resource: 'managers',
            method: 'updateMe',
            verb: 'PATCH',
            roles: [],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'name',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'surname',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'phone',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'location',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'position',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'theme',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['white', 'black'],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            managersApi.updateMe(
                args[0] as Parameters<typeof managersApi.updateMe>[0],
                options,
            ),
    },
    {
        ...{
            id: 'managers.list',
            resource: 'managers',
            method: 'list',
            verb: 'GET',
            roles: ['admin'],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: [
                                'active',
                                'pending',
                                'blocked',
                                'archived',
                            ],
                        },
                        {
                            name: 'email',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            managersApi.list(
                args[0] as Parameters<typeof managersApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'managers.getById',
            resource: 'managers',
            method: 'getById',
            verb: 'GET',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            managersApi.getById(
                args[0] as Parameters<typeof managersApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'managers.updateRoles',
            resource: 'managers',
            method: 'updateRoles',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'roleIds',
                            optional: false,
                            nullable: false,
                            kind: 'array',
                            item: {
                                name: 'item',
                                optional: false,
                                nullable: false,
                                kind: 'number',
                            },
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            managersApi.updateRoles(
                args[0] as Parameters<typeof managersApi.updateRoles>[0],
                args[1] as Parameters<typeof managersApi.updateRoles>[1],
                options,
            ),
    },
    {
        ...{
            id: 'managers.update',
            resource: 'managers',
            method: 'update',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'name',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'surname',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'phone',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'location',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'position',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'theme',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['white', 'black'],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            managersApi.update(
                args[0] as Parameters<typeof managersApi.update>[0],
                args[1] as Parameters<typeof managersApi.update>[1],
                options,
            ),
    },
    {
        ...{
            id: 'managers.remove',
            resource: 'managers',
            method: 'remove',
            verb: 'DELETE',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            managersApi.remove(
                args[0] as Parameters<typeof managersApi.remove>[0],
                options,
            ),
    },
    {
        ...{
            id: 'roles.create',
            resource: 'roles',
            method: 'create',
            verb: 'POST',
            roles: ['admin'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'name',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            rolesApi.create(
                args[0] as Parameters<typeof rolesApi.create>[0],
                options,
            ),
    },
    {
        ...{
            id: 'roles.list',
            resource: 'roles',
            method: 'list',
            verb: 'GET',
            roles: ['admin'],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            rolesApi.list(
                args[0] as Parameters<typeof rolesApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'files.download',
            resource: 'files',
            method: 'download',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'bucket',
                    kind: 'enum',
                    optional: false,
                    nullable: false,
                    choices: [
                        'instruction_headers',
                        'instruction_images',
                        'blog_images',
                        'manager_files',
                        'legal_document_drafts',
                        'account_ava',
                        'gdoc_templates',
                        'user_docs',
                        'consultation_files',
                        'partner_logos',
                        'partner_main',
                        'partner_adv',
                    ],
                },
                {
                    name: 'relPath',
                    optional: false,
                    nullable: false,
                    kind: 'array',
                    item: {
                        name: 'item',
                        optional: false,
                        nullable: false,
                        kind: 'string',
                    },
                },
                {
                    name: 'query',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'e',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'sig',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            filesApi.download(
                args[0] as Parameters<typeof filesApi.download>[0],
                args[1] as Parameters<typeof filesApi.download>[1],
                args[2] as Parameters<typeof filesApi.download>[2],
                options,
            ),
    },
    {
        ...{
            id: 'private-assets.list',
            resource: 'private-assets',
            method: 'list',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'bucket',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: [
                                'instruction_headers',
                                'instruction_images',
                                'blog_images',
                                'manager_files',
                                'legal_document_drafts',
                                'account_ava',
                                'gdoc_templates',
                                'user_docs',
                                'consultation_files',
                                'partner_logos',
                                'partner_main',
                                'partner_adv',
                            ],
                        },
                        {
                            name: 'search',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            privateAssetsApi.list(
                args[0] as Parameters<typeof privateAssetsApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'private-assets.create',
            resource: 'private-assets',
            method: 'create',
            verb: 'POST',
            roles: [],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'bucket',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: [
                                'instruction_headers',
                                'instruction_images',
                                'blog_images',
                                'manager_files',
                                'legal_document_drafts',
                                'account_ava',
                                'gdoc_templates',
                                'user_docs',
                                'consultation_files',
                                'partner_logos',
                                'partner_main',
                                'partner_adv',
                            ],
                        },
                        {
                            name: 'originalName',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'ownerAccountId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'visibility',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: [
                                'private',
                                'owner_and_managers',
                                'managers',
                                'admins',
                                'all_accounts',
                            ],
                        },
                    ],
                },
                {
                    name: 'file',
                    optional: false,
                    nullable: false,
                    kind: 'file',
                },
            ],
        },
        execute: (args, options) =>
            privateAssetsApi.create(
                args[0] as Parameters<typeof privateAssetsApi.create>[0],
                args[1] as Parameters<typeof privateAssetsApi.create>[1],
                options,
            ),
    },
    {
        ...{
            id: 'private-assets.getById',
            resource: 'private-assets',
            method: 'getById',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            privateAssetsApi.getById(
                args[0] as Parameters<typeof privateAssetsApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'private-assets.remove',
            resource: 'private-assets',
            method: 'remove',
            verb: 'DELETE',
            roles: [],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            privateAssetsApi.remove(
                args[0] as Parameters<typeof privateAssetsApi.remove>[0],
                options,
            ),
    },
    {
        ...{
            id: 'private-assets.togglePopular',
            resource: 'private-assets',
            method: 'togglePopular',
            verb: 'PATCH',
            roles: [],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            privateAssetsApi.togglePopular(
                args[0] as Parameters<typeof privateAssetsApi.togglePopular>[0],
                options,
            ),
    },
    {
        ...{
            id: 'private-assets.getUrl',
            resource: 'private-assets',
            method: 'getUrl',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            privateAssetsApi.getUrl(
                args[0] as Parameters<typeof privateAssetsApi.getUrl>[0],
                options,
            ),
    },
    {
        ...{
            id: 'private-assets.download',
            resource: 'private-assets',
            method: 'download',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            privateAssetsApi.download(
                args[0] as Parameters<typeof privateAssetsApi.download>[0],
                options,
            ),
    },
    {
        ...{
            id: 'private-variants.list',
            resource: 'private-variants',
            method: 'list',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'bucket',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: [
                                'instruction_headers',
                                'instruction_images',
                                'blog_images',
                                'manager_files',
                                'legal_document_drafts',
                                'account_ava',
                                'gdoc_templates',
                                'user_docs',
                                'consultation_files',
                                'partner_logos',
                                'partner_main',
                                'partner_adv',
                            ],
                        },
                        {
                            name: 'search',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            privateVariantsApi.list(
                args[0] as Parameters<typeof privateVariantsApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'private-variants.create',
            resource: 'private-variants',
            method: 'create',
            verb: 'POST',
            roles: [],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'bucket',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: [
                                'instruction_headers',
                                'instruction_images',
                                'blog_images',
                                'manager_files',
                                'legal_document_drafts',
                                'account_ava',
                                'gdoc_templates',
                                'user_docs',
                                'consultation_files',
                                'partner_logos',
                                'partner_main',
                                'partner_adv',
                            ],
                        },
                        {
                            name: 'originalName',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'ownerAccountId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'visibility',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: [
                                'private',
                                'owner_and_managers',
                                'managers',
                                'admins',
                                'all_accounts',
                            ],
                        },
                    ],
                },
                {
                    name: 'file',
                    optional: false,
                    nullable: false,
                    kind: 'file',
                },
            ],
        },
        execute: (args, options) =>
            privateVariantsApi.create(
                args[0] as Parameters<typeof privateVariantsApi.create>[0],
                args[1] as Parameters<typeof privateVariantsApi.create>[1],
                options,
            ),
    },
    {
        ...{
            id: 'private-variants.getById',
            resource: 'private-variants',
            method: 'getById',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            privateVariantsApi.getById(
                args[0] as Parameters<typeof privateVariantsApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'private-variants.remove',
            resource: 'private-variants',
            method: 'remove',
            verb: 'DELETE',
            roles: [],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            privateVariantsApi.remove(
                args[0] as Parameters<typeof privateVariantsApi.remove>[0],
                options,
            ),
    },
    {
        ...{
            id: 'private-variants.togglePopular',
            resource: 'private-variants',
            method: 'togglePopular',
            verb: 'PATCH',
            roles: [],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            privateVariantsApi.togglePopular(
                args[0] as Parameters<
                    typeof privateVariantsApi.togglePopular
                >[0],
                options,
            ),
    },
    {
        ...{
            id: 'public-assets.create',
            resource: 'public-assets',
            method: 'create',
            verb: 'POST',
            roles: ['admin', 'manager', 'writer'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'bucket',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: ['icons', 'system_files'],
                        },
                        {
                            name: 'originalName',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
                {
                    name: 'file',
                    optional: false,
                    nullable: false,
                    kind: 'file',
                },
            ],
        },
        execute: (args, options) =>
            publicAssetsApi.create(
                args[0] as Parameters<typeof publicAssetsApi.create>[0],
                args[1] as Parameters<typeof publicAssetsApi.create>[1],
                options,
            ),
    },
    {
        ...{
            id: 'public-assets.list',
            resource: 'public-assets',
            method: 'list',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'bucket',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: [
                                'legal_documents',
                                'icons',
                                'system_files',
                            ],
                        },
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'isPopular',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            publicAssetsApi.list(
                args[0] as Parameters<typeof publicAssetsApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'public-assets.getById',
            resource: 'public-assets',
            method: 'getById',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            publicAssetsApi.getById(
                args[0] as Parameters<typeof publicAssetsApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'public-assets.remove',
            resource: 'public-assets',
            method: 'remove',
            verb: 'DELETE',
            roles: ['admin', 'manager', 'writer'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            publicAssetsApi.remove(
                args[0] as Parameters<typeof publicAssetsApi.remove>[0],
                options,
            ),
    },
    {
        ...{
            id: 'public-assets.togglePopular',
            resource: 'public-assets',
            method: 'togglePopular',
            verb: 'PATCH',
            roles: ['admin', 'manager', 'writer'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            publicAssetsApi.togglePopular(
                args[0] as Parameters<typeof publicAssetsApi.togglePopular>[0],
                options,
            ),
    },
    {
        ...{
            id: 'user-notification-jobs.create',
            resource: 'user-notification-jobs',
            method: 'create',
            verb: 'POST',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'title',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'subject',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'text',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'audience',
                            optional: true,
                            nullable: false,
                            kind: 'object',
                            fields: [
                                {
                                    name: 'language',
                                    optional: true,
                                    nullable: false,
                                    kind: 'array',
                                    item: {
                                        name: 'item',
                                        kind: 'enum',
                                        optional: false,
                                        nullable: false,
                                        choices: ['UA', 'PL', 'EN', 'RU'],
                                    },
                                },
                                {
                                    name: 'status',
                                    optional: true,
                                    nullable: false,
                                    kind: 'array',
                                    item: {
                                        name: 'item',
                                        kind: 'enum',
                                        optional: false,
                                        nullable: false,
                                        choices: [
                                            'active',
                                            'pending',
                                            'blocked',
                                            'archived',
                                        ],
                                    },
                                },
                                {
                                    name: 'level',
                                    optional: true,
                                    nullable: false,
                                    kind: 'array',
                                    item: {
                                        name: 'item',
                                        optional: false,
                                        nullable: false,
                                        kind: 'number',
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            userNotificationJobsApi.create(
                args[0] as Parameters<typeof userNotificationJobsApi.create>[0],
                options,
            ),
    },
    {
        ...{
            id: 'user-notification-jobs.list',
            resource: 'user-notification-jobs',
            method: 'list',
            verb: 'GET',
            roles: ['admin', 'manager', 'writer'],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: [
                                'draft',
                                'scheduled',
                                'running',
                                'done',
                                'cancelled',
                            ],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            userNotificationJobsApi.list(
                args[0] as Parameters<typeof userNotificationJobsApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'user-notification-jobs.getById',
            resource: 'user-notification-jobs',
            method: 'getById',
            verb: 'GET',
            roles: ['admin', 'manager', 'writer'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            userNotificationJobsApi.getById(
                args[0] as Parameters<
                    typeof userNotificationJobsApi.getById
                >[0],
                options,
            ),
    },
    {
        ...{
            id: 'user-notification-jobs.update',
            resource: 'user-notification-jobs',
            method: 'update',
            verb: 'PATCH',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'title',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'subject',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'text',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'audience',
                            optional: true,
                            nullable: false,
                            kind: 'object',
                            fields: [
                                {
                                    name: 'language',
                                    optional: true,
                                    nullable: false,
                                    kind: 'array',
                                    item: {
                                        name: 'item',
                                        kind: 'enum',
                                        optional: false,
                                        nullable: false,
                                        choices: ['UA', 'PL', 'EN', 'RU'],
                                    },
                                },
                                {
                                    name: 'status',
                                    optional: true,
                                    nullable: false,
                                    kind: 'array',
                                    item: {
                                        name: 'item',
                                        kind: 'enum',
                                        optional: false,
                                        nullable: false,
                                        choices: [
                                            'active',
                                            'pending',
                                            'blocked',
                                            'archived',
                                        ],
                                    },
                                },
                                {
                                    name: 'level',
                                    optional: true,
                                    nullable: false,
                                    kind: 'array',
                                    item: {
                                        name: 'item',
                                        optional: false,
                                        nullable: false,
                                        kind: 'number',
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            userNotificationJobsApi.update(
                args[0] as Parameters<typeof userNotificationJobsApi.update>[0],
                args[1] as Parameters<typeof userNotificationJobsApi.update>[1],
                options,
            ),
    },
    {
        ...{
            id: 'user-notification-jobs.schedule',
            resource: 'user-notification-jobs',
            method: 'schedule',
            verb: 'POST',
            roles: ['admin', 'writer'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'deliverAt',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            userNotificationJobsApi.schedule(
                args[0] as Parameters<
                    typeof userNotificationJobsApi.schedule
                >[0],
                args[1] as Parameters<
                    typeof userNotificationJobsApi.schedule
                >[1],
                options,
            ),
    },
    {
        ...{
            id: 'user-notification-jobs.cancel',
            resource: 'user-notification-jobs',
            method: 'cancel',
            verb: 'POST',
            roles: ['admin', 'writer'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            userNotificationJobsApi.cancel(
                args[0] as Parameters<typeof userNotificationJobsApi.cancel>[0],
                options,
            ),
    },
    {
        ...{
            id: 'user-notification-jobs.progress',
            resource: 'user-notification-jobs',
            method: 'progress',
            verb: 'GET',
            roles: ['admin', 'manager', 'writer'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            userNotificationJobsApi.progress(
                args[0] as Parameters<
                    typeof userNotificationJobsApi.progress
                >[0],
                options,
            ),
    },
    {
        ...{
            id: 'user-notification-jobs.build',
            resource: 'user-notification-jobs',
            method: 'build',
            verb: 'POST',
            roles: ['admin', 'writer'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            userNotificationJobsApi.build(
                args[0] as Parameters<typeof userNotificationJobsApi.build>[0],
                options,
            ),
    },
    {
        ...{
            id: 'user-notification-jobs.tick',
            resource: 'user-notification-jobs',
            method: 'tick',
            verb: 'POST',
            roles: ['admin', 'writer'],
            args: [],
        },
        execute: (args, options) => userNotificationJobsApi.tick(options),
    },
    {
        ...{
            id: 'user-notification-queue.tick',
            resource: 'user-notification-queue',
            method: 'tick',
            verb: 'POST',
            roles: ['admin', 'writer'],
            args: [],
        },
        execute: (args, options) => userNotificationQueueApi.tick(options),
    },
    {
        ...{
            id: 'user-notifications.send',
            resource: 'user-notifications',
            method: 'send',
            verb: 'POST',
            roles: ['admin', 'writer'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'userId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'subject',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'text',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            userNotificationsApi.send(
                args[0] as Parameters<typeof userNotificationsApi.send>[0],
                options,
            ),
    },
    {
        ...{
            id: 'partner-banners.list',
            resource: 'partner-banners',
            method: 'list',
            verb: 'GET',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'companyId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'type',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['big', 'small'],
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: [
                                'draft',
                                'pending_review',
                                'approved',
                                'rejected',
                                'active',
                                'finished',
                            ],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            partnerBannersApi.list(
                args[0] as Parameters<typeof partnerBannersApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'partner-banners.getById',
            resource: 'partner-banners',
            method: 'getById',
            verb: 'GET',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            partnerBannersApi.getById(
                args[0] as Parameters<typeof partnerBannersApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'partner-banners.approve',
            resource: 'partner-banners',
            method: 'approve',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            partnerBannersApi.approve(
                args[0] as Parameters<typeof partnerBannersApi.approve>[0],
                options,
            ),
    },
    {
        ...{
            id: 'partner-banners.reject',
            resource: 'partner-banners',
            method: 'reject',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'rejectReason',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            partnerBannersApi.reject(
                args[0] as Parameters<typeof partnerBannersApi.reject>[0],
                args[1] as Parameters<typeof partnerBannersApi.reject>[1],
                options,
            ),
    },
    {
        ...{
            id: 'partner-banners.activate',
            resource: 'partner-banners',
            method: 'activate',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'endDate',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            partnerBannersApi.activate(
                args[0] as Parameters<typeof partnerBannersApi.activate>[0],
                args[1] as Parameters<typeof partnerBannersApi.activate>[1],
                options,
            ),
    },
    {
        ...{
            id: 'partner-banners.finish',
            resource: 'partner-banners',
            method: 'finish',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            partnerBannersApi.finish(
                args[0] as Parameters<typeof partnerBannersApi.finish>[0],
                options,
            ),
    },
    {
        ...{
            id: 'partner-banners.remove',
            resource: 'partner-banners',
            method: 'remove',
            verb: 'DELETE',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            partnerBannersApi.remove(
                args[0] as Parameters<typeof partnerBannersApi.remove>[0],
                options,
            ),
    },
    {
        ...{
            id: 'partner-companies.create',
            resource: 'partner-companies',
            method: 'create',
            verb: 'POST',
            roles: ['admin'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'partnerId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'companyName',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'contactEmail',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'phone',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            partnerCompaniesApi.create(
                args[0] as Parameters<typeof partnerCompaniesApi.create>[0],
                options,
            ),
    },
    {
        ...{
            id: 'partner-companies.list',
            resource: 'partner-companies',
            method: 'list',
            verb: 'GET',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'partnerId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'companyName',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['draft', 'active', 'blocked', 'archived'],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            partnerCompaniesApi.list(
                args[0] as Parameters<typeof partnerCompaniesApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'partner-companies.getById',
            resource: 'partner-companies',
            method: 'getById',
            verb: 'GET',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            partnerCompaniesApi.getById(
                args[0] as Parameters<typeof partnerCompaniesApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'partner-companies.update',
            resource: 'partner-companies',
            method: 'update',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'companyName',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'contactEmail',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'phone',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            partnerCompaniesApi.update(
                args[0] as Parameters<typeof partnerCompaniesApi.update>[0],
                args[1] as Parameters<typeof partnerCompaniesApi.update>[1],
                options,
            ),
    },
    {
        ...{
            id: 'partner-companies.uploadLogo',
            resource: 'partner-companies',
            method: 'uploadLogo',
            verb: 'POST',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'file',
                    optional: false,
                    nullable: false,
                    kind: 'file',
                },
            ],
        },
        execute: (args, options) =>
            partnerCompaniesApi.uploadLogo(
                args[0] as Parameters<typeof partnerCompaniesApi.uploadLogo>[0],
                args[1] as Parameters<typeof partnerCompaniesApi.uploadLogo>[1],
                options,
            ),
    },
    {
        ...{
            id: 'partner-companies.updateStatus',
            resource: 'partner-companies',
            method: 'updateStatus',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: ['draft', 'active', 'blocked', 'archived'],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            partnerCompaniesApi.updateStatus(
                args[0] as Parameters<
                    typeof partnerCompaniesApi.updateStatus
                >[0],
                args[1] as Parameters<
                    typeof partnerCompaniesApi.updateStatus
                >[1],
                options,
            ),
    },
    {
        ...{
            id: 'partner-companies.remove',
            resource: 'partner-companies',
            method: 'remove',
            verb: 'DELETE',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            partnerCompaniesApi.remove(
                args[0] as Parameters<typeof partnerCompaniesApi.remove>[0],
                options,
            ),
    },
    {
        ...{
            id: 'partner-company-info.update',
            resource: 'partner-company-info',
            method: 'update',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'websiteUrl',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'shortDescriptionUa',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'shortDescriptionEn',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'shortDescriptionPl',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'shortDescriptionRu',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'descriptionUa',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'descriptionEn',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'descriptionPl',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'descriptionRu',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'instagramUrl',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'facebookUrl',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'tiktokUrl',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'linkedinUrl',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'youtubeUrl',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'telegramUrl',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            partnerCompanyInfoApi.update(
                args[0] as Parameters<typeof partnerCompanyInfoApi.update>[0],
                args[1] as Parameters<typeof partnerCompanyInfoApi.update>[1],
                options,
            ),
    },
    {
        ...{
            id: 'partner-company-info.uploadPhoto',
            resource: 'partner-company-info',
            method: 'uploadPhoto',
            verb: 'POST',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'file',
                    optional: false,
                    nullable: false,
                    kind: 'file',
                },
            ],
        },
        execute: (args, options) =>
            partnerCompanyInfoApi.uploadPhoto(
                args[0] as Parameters<
                    typeof partnerCompanyInfoApi.uploadPhoto
                >[0],
                args[1] as Parameters<
                    typeof partnerCompanyInfoApi.uploadPhoto
                >[1],
                options,
            ),
    },
    {
        ...{
            id: 'partners.register',
            resource: 'partners',
            method: 'register',
            verb: 'POST',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'email',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'password',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'name',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'surname',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'location',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'phone',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            partnersApi.register(
                args[0] as Parameters<typeof partnersApi.register>[0],
                options,
            ),
    },
    {
        ...{
            id: 'partners.list',
            resource: 'partners',
            method: 'list',
            verb: 'GET',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'id',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'email',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'name',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'surname',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'phone',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'location',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: [
                                'active',
                                'pending',
                                'blocked',
                                'archived',
                            ],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            partnersApi.list(
                args[0] as Parameters<typeof partnersApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'partners.getById',
            resource: 'partners',
            method: 'getById',
            verb: 'GET',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            partnersApi.getById(
                args[0] as Parameters<typeof partnersApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'partners.update',
            resource: 'partners',
            method: 'update',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'name',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'surname',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'location',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'phone',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            partnersApi.update(
                args[0] as Parameters<typeof partnersApi.update>[0],
                args[1] as Parameters<typeof partnersApi.update>[1],
                options,
            ),
    },
    {
        ...{
            id: 'partners.updateStatus',
            resource: 'partners',
            method: 'updateStatus',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: [
                                'active',
                                'pending',
                                'blocked',
                                'archived',
                            ],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            partnersApi.updateStatus(
                args[0] as Parameters<typeof partnersApi.updateStatus>[0],
                args[1] as Parameters<typeof partnersApi.updateStatus>[1],
                options,
            ),
    },
    {
        ...{
            id: 'partners.remove',
            resource: 'partners',
            method: 'remove',
            verb: 'DELETE',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            partnersApi.remove(
                args[0] as Parameters<typeof partnersApi.remove>[0],
                options,
            ),
    },
    {
        ...{
            id: 'payment-ledger.list',
            resource: 'payment-ledger',
            method: 'list',
            verb: 'GET',
            roles: ['admin'],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'environment',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['production', 'sandbox'],
                        },
                        {
                            name: 'kind',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['payment', 'refund'],
                        },
                        {
                            name: 'product',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['consultation', 'subscription'],
                        },
                        {
                            name: 'provider',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['apple', 'google', 'stripe'],
                        },
                        {
                            name: 'currency',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'from',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'to',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'group',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['day', 'month'],
                        },
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            paymentLedgerApi.list(
                args[0] as Parameters<typeof paymentLedgerApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'consultation-promocodes.create',
            resource: 'consultation-promocodes',
            method: 'create',
            verb: 'POST',
            roles: ['admin'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'type',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: ['percent', 'amount'],
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['active', 'inactive', 'expired'],
                        },
                        {
                            name: 'code',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'value',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'currency',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'startsAt',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'expiresAt',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'maxRedemptions',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'perAccountLimit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'restrictedAccounts',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                        {
                            name: 'notes',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'specialistId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'specialistConsultationId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            consultationPromocodesApi.create(
                args[0] as Parameters<
                    typeof consultationPromocodesApi.create
                >[0],
                options,
            ),
    },
    {
        ...{
            id: 'consultation-promocodes.getById',
            resource: 'consultation-promocodes',
            method: 'getById',
            verb: 'GET',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            consultationPromocodesApi.getById(
                args[0] as Parameters<
                    typeof consultationPromocodesApi.getById
                >[0],
                options,
            ),
    },
    {
        ...{
            id: 'consultation-promocodes.update',
            resource: 'consultation-promocodes',
            method: 'update',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'specialistId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'specialistConsultationId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            consultationPromocodesApi.update(
                args[0] as Parameters<
                    typeof consultationPromocodesApi.update
                >[0],
                args[1] as Parameters<
                    typeof consultationPromocodesApi.update
                >[1],
                options,
            ),
    },
    {
        ...{
            id: 'consultation-promocodes.remove',
            resource: 'consultation-promocodes',
            method: 'remove',
            verb: 'DELETE',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            consultationPromocodesApi.remove(
                args[0] as Parameters<
                    typeof consultationPromocodesApi.remove
                >[0],
                options,
            ),
    },
    {
        ...{
            id: 'promocodes.create',
            resource: 'promocodes',
            method: 'create',
            verb: 'POST',
            roles: ['admin'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'code',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'productType',
                            optional: false,
                            nullable: false,
                            kind: 'enum',
                            choices: ['consultation'],
                        },
                        {
                            name: 'type',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: ['percent', 'amount'],
                        },
                        {
                            name: 'value',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'currency',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['active', 'inactive', 'expired'],
                        },
                        {
                            name: 'startsAt',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'expiresAt',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'maxRedemptions',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'perAccountLimit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'restrictedAccounts',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                        {
                            name: 'notes',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            promocodesApi.create(
                args[0] as Parameters<typeof promocodesApi.create>[0],
                options,
            ),
    },
    {
        ...{
            id: 'promocodes.list',
            resource: 'promocodes',
            method: 'list',
            verb: 'GET',
            roles: ['admin'],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'code',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'productType',
                            optional: true,
                            nullable: false,
                            kind: 'enum',
                            choices: ['consultation'],
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['active', 'inactive', 'expired'],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            promocodesApi.list(
                args[0] as Parameters<typeof promocodesApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'promocodes.getById',
            resource: 'promocodes',
            method: 'getById',
            verb: 'GET',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            promocodesApi.getById(
                args[0] as Parameters<typeof promocodesApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'promocodes.update',
            resource: 'promocodes',
            method: 'update',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'type',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['percent', 'amount'],
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['active', 'inactive', 'expired'],
                        },
                        {
                            name: 'code',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'value',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'currency',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'startsAt',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'expiresAt',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'maxRedemptions',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'perAccountLimit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'restrictedAccounts',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                        {
                            name: 'notes',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            promocodesApi.update(
                args[0] as Parameters<typeof promocodesApi.update>[0],
                args[1] as Parameters<typeof promocodesApi.update>[1],
                options,
            ),
    },
    {
        ...{
            id: 'promocodes.activate',
            resource: 'promocodes',
            method: 'activate',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            promocodesApi.activate(
                args[0] as Parameters<typeof promocodesApi.activate>[0],
                options,
            ),
    },
    {
        ...{
            id: 'promocodes.deactivate',
            resource: 'promocodes',
            method: 'deactivate',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            promocodesApi.deactivate(
                args[0] as Parameters<typeof promocodesApi.deactivate>[0],
                options,
            ),
    },
    {
        ...{
            id: 'promocodes.remove',
            resource: 'promocodes',
            method: 'remove',
            verb: 'DELETE',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            promocodesApi.remove(
                args[0] as Parameters<typeof promocodesApi.remove>[0],
                options,
            ),
    },
    {
        ...{
            id: 'promocodes.setAccounts',
            resource: 'promocodes',
            method: 'setAccounts',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'accountIds',
                            optional: false,
                            nullable: false,
                            kind: 'array',
                            item: {
                                name: 'item',
                                optional: false,
                                nullable: false,
                                kind: 'number',
                            },
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            promocodesApi.setAccounts(
                args[0] as Parameters<typeof promocodesApi.setAccounts>[0],
                args[1] as Parameters<typeof promocodesApi.setAccounts>[1],
                options,
            ),
    },
    {
        ...{
            id: 'promocodes.listAccounts',
            resource: 'promocodes',
            method: 'listAccounts',
            verb: 'GET',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'accountId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            promocodesApi.listAccounts(
                args[0] as Parameters<typeof promocodesApi.listAccounts>[0],
                args[1] as Parameters<typeof promocodesApi.listAccounts>[1],
                options,
            ),
    },
    {
        ...{
            id: 'promocodes.listUsages',
            resource: 'promocodes',
            method: 'listUsages',
            verb: 'GET',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'accountId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            promocodesApi.listUsages(
                args[0] as Parameters<typeof promocodesApi.listUsages>[0],
                args[1] as Parameters<typeof promocodesApi.listUsages>[1],
                options,
            ),
    },
    {
        ...{
            id: 'user-reminder-events.tick',
            resource: 'user-reminder-events',
            method: 'tick',
            verb: 'POST',
            roles: ['admin', 'manager', 'writer'],
            args: [],
        },
        execute: (args, options) => userReminderEventsApi.tick(options),
    },
    {
        ...{
            id: 'user-reminders.create',
            resource: 'user-reminders',
            method: 'create',
            verb: 'POST',
            roles: ['admin', 'manager', 'writer'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'userId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'userTaskId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'topic',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'text',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'targetAt',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'sendInApp',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                        {
                            name: 'sendEmail',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            userRemindersApi.create(
                args[0] as Parameters<typeof userRemindersApi.create>[0],
                options,
            ),
    },
    {
        ...{
            id: 'specialists.register',
            resource: 'specialists',
            method: 'register',
            verb: 'POST',
            roles: ['admin'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'email',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'password',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'name',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'surname',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'location',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'phone',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            specialistsApi.register(
                args[0] as Parameters<typeof specialistsApi.register>[0],
                options,
            ),
    },
    {
        ...{
            id: 'specialists.list',
            resource: 'specialists',
            method: 'list',
            verb: 'GET',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'id',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'email',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'name',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'surname',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'phone',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'location',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: [
                                'active',
                                'pending',
                                'blocked',
                                'archived',
                            ],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            specialistsApi.list(
                args[0] as Parameters<typeof specialistsApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'specialists.getById',
            resource: 'specialists',
            method: 'getById',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            specialistsApi.getById(
                args[0] as Parameters<typeof specialistsApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'specialists.update',
            resource: 'specialists',
            method: 'update',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'name',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'surname',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'location',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'phone',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'verified',
                            kind: 'boolean',
                            optional: true,
                            nullable: false,
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            specialistsApi.update(
                args[0] as Parameters<typeof specialistsApi.update>[0],
                args[1] as Parameters<typeof specialistsApi.update>[1],
                options,
            ),
    },
    {
        ...{
            id: 'specialists.updateStatus',
            resource: 'specialists',
            method: 'updateStatus',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: [
                                'active',
                                'pending',
                                'blocked',
                                'archived',
                            ],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            specialistsApi.updateStatus(
                args[0] as Parameters<typeof specialistsApi.updateStatus>[0],
                args[1] as Parameters<typeof specialistsApi.updateStatus>[1],
                options,
            ),
    },
    {
        ...{
            id: 'specialists.remove',
            resource: 'specialists',
            method: 'remove',
            verb: 'DELETE',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            specialistsApi.remove(
                args[0] as Parameters<typeof specialistsApi.remove>[0],
                options,
            ),
    },
    {
        ...{
            id: 'subscription-plans.list',
            resource: 'subscription-plans',
            method: 'list',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            subscriptionPlansApi.list(
                args[0] as Parameters<typeof subscriptionPlansApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'subscription-plans.getById',
            resource: 'subscription-plans',
            method: 'getById',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            subscriptionPlansApi.getById(
                args[0] as Parameters<typeof subscriptionPlansApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'subscription-plans.create',
            resource: 'subscription-plans',
            method: 'create',
            verb: 'POST',
            roles: ['admin'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'code',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'name',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'rank',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'documentsPerMonth',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'openCases',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'consultationDiscountPercent',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'retentionMonths',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            subscriptionPlansApi.create(
                args[0] as Parameters<typeof subscriptionPlansApi.create>[0],
                options,
            ),
    },
    {
        ...{
            id: 'subscription-plans.retire',
            resource: 'subscription-plans',
            method: 'retire',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            subscriptionPlansApi.retire(
                args[0] as Parameters<typeof subscriptionPlansApi.retire>[0],
                options,
            ),
    },
    {
        ...{
            id: 'subscription-plans.trialSettings',
            resource: 'subscription-plans',
            method: 'trialSettings',
            verb: 'GET',
            roles: ['admin'],
            args: [],
        },
        execute: (args, options) => subscriptionPlansApi.trialSettings(options),
    },
    {
        ...{
            id: 'subscription-plans.updateTrialSettings',
            resource: 'subscription-plans',
            method: 'updateTrialSettings',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'planId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'days',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'enabled',
                            kind: 'boolean',
                            optional: false,
                            nullable: false,
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            subscriptionPlansApi.updateTrialSettings(
                args[0] as Parameters<
                    typeof subscriptionPlansApi.updateTrialSettings
                >[0],
                options,
            ),
    },
    {
        ...{
            id: 'subscription-prices.list',
            resource: 'subscription-prices',
            method: 'list',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            subscriptionPricesApi.list(
                args[0] as Parameters<typeof subscriptionPricesApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'subscription-prices.getById',
            resource: 'subscription-prices',
            method: 'getById',
            verb: 'GET',
            roles: [],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            subscriptionPricesApi.getById(
                args[0] as Parameters<typeof subscriptionPricesApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'subscription-prices.create',
            resource: 'subscription-prices',
            method: 'create',
            verb: 'POST',
            roles: ['admin'],
            args: [
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'planId',
                            optional: false,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'provider',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: ['dev', 'apple', 'google'],
                        },
                        {
                            name: 'interval',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: ['monthly', 'yearly'],
                        },
                        {
                            name: 'productId',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'basePlanId',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            subscriptionPricesApi.create(
                args[0] as Parameters<typeof subscriptionPricesApi.create>[0],
                options,
            ),
    },
    {
        ...{
            id: 'subscription-prices.retire',
            resource: 'subscription-prices',
            method: 'retire',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            subscriptionPricesApi.retire(
                args[0] as Parameters<typeof subscriptionPricesApi.retire>[0],
                options,
            ),
    },
    {
        ...{
            id: 'user-subscriptions.simulate',
            resource: 'user-subscriptions',
            method: 'simulate',
            verb: 'POST',
            roles: ['admin'],
            args: [
                {
                    name: 'userId',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'legalAcceptanceId',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'eventId',
                            optional: false,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'action',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: [
                                'purchase',
                                'renew',
                                'upgrade',
                                'schedule',
                                'cancel',
                                'resume',
                                'expire',
                                'revoke',
                            ],
                        },
                        {
                            name: 'priceId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'occurredAt',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            userSubscriptionsApi.simulate(
                args[0] as Parameters<typeof userSubscriptionsApi.simulate>[0],
                args[1] as Parameters<typeof userSubscriptionsApi.simulate>[1],
                options,
            ),
    },
    {
        ...{
            id: 'users.list',
            resource: 'users',
            method: 'list',
            verb: 'GET',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'query',
                    optional: true,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'page',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'limit',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'offset',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'id',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'parentId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'level',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'email',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'name',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'surname',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'phone',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'location',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'lan',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['UA', 'PL', 'EN', 'RU'],
                        },
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: [
                                'active',
                                'pending',
                                'blocked',
                                'archived',
                            ],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            usersApi.list(
                args[0] as Parameters<typeof usersApi.list>[0],
                options,
            ),
    },
    {
        ...{
            id: 'users.getById',
            resource: 'users',
            method: 'getById',
            verb: 'GET',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
            ],
        },
        execute: (args, options) =>
            usersApi.getById(
                args[0] as Parameters<typeof usersApi.getById>[0],
                options,
            ),
    },
    {
        ...{
            id: 'users.update',
            resource: 'users',
            method: 'update',
            verb: 'PATCH',
            roles: ['admin', 'manager'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'name',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'surname',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'phone',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'location',
                            optional: true,
                            nullable: false,
                            kind: 'string',
                        },
                        {
                            name: 'lan',
                            kind: 'enum',
                            optional: true,
                            nullable: false,
                            choices: ['UA', 'PL', 'EN', 'RU'],
                        },
                        {
                            name: 'level',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                        {
                            name: 'parentId',
                            optional: true,
                            nullable: false,
                            kind: 'number',
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            usersApi.update(
                args[0] as Parameters<typeof usersApi.update>[0],
                args[1] as Parameters<typeof usersApi.update>[1],
                options,
            ),
    },
    {
        ...{
            id: 'users.updateStatus',
            resource: 'users',
            method: 'updateStatus',
            verb: 'PATCH',
            roles: ['admin'],
            args: [
                {
                    name: 'id',
                    optional: false,
                    nullable: false,
                    kind: 'number',
                },
                {
                    name: 'dto',
                    optional: false,
                    nullable: false,
                    kind: 'object',
                    fields: [
                        {
                            name: 'status',
                            kind: 'enum',
                            optional: false,
                            nullable: false,
                            choices: [
                                'active',
                                'pending',
                                'blocked',
                                'archived',
                            ],
                        },
                    ],
                },
            ],
        },
        execute: (args, options) =>
            usersApi.updateStatus(
                args[0] as Parameters<typeof usersApi.updateStatus>[0],
                args[1] as Parameters<typeof usersApi.updateStatus>[1],
                options,
            ),
    },
]
