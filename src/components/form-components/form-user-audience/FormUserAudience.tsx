'use client'

import type { AudienceFilters } from '../../../api/mail/mail-jobs/mail-jobs.types'
import { Languages, AccountType } from '../../../api/common.types'
import { AccountStatus } from '../../../api/accounts/accounts/accounts.types'
import FormSelect from '../form-select/FormSelect'
import c from './FormUserAudience.module.scss'

export default function FormUserAudience({
    audience,
    onChange,
}: {
    audience: AudienceFilters | null
    onChange: (value: AudienceFilters | null) => void
}) {
    function update<K extends keyof AudienceFilters>(
        key: K,
        value: AudienceFilters[K],
    ) {
        const next = { ...audience, [key]: value }

        if (!value?.length) delete next[key]

        onChange(Object.keys(next).length ? next : null)
    }

    return (
        <div className={c.audience}>
            <p className={c.audience__title}>odfiltruj użytkowników</p>
            <FormSelect<Languages | null>
                selectTitle="język"
                item={audience?.language?.[0] ?? null}
                options={[
                    { title: 'Wszystkie', value: null },
                    ...Object.values(Languages).map((value) => ({
                        title: value,
                        value,
                    })),
                ]}
                onChange={(value) =>
                    update('language', value ? [value] : undefined)
                }
            />
            <FormSelect<AccountStatus | null>
                selectTitle="status konta"
                item={audience?.status?.[0] ?? null}
                options={[
                    { title: 'Wszystkie', value: null },
                    ...Object.values(AccountStatus).map((value) => ({
                        title: value,
                        value,
                    })),
                ]}
                onChange={(value) =>
                    update('status', value ? [value] : undefined)
                }
            />
            <FormSelect<AccountType | null>
                selectTitle="typ konta"
                item={audience?.accountTypes?.[0] ?? null}
                options={[
                    { title: 'Wszystkie', value: null },
                    ...Object.values(AccountType).map((value) => ({
                        title: value,
                        value,
                    })),
                ]}
                onChange={(value) =>
                    update('accountTypes', value ? [value] : undefined)
                }
            />
        </div>
    )
}
