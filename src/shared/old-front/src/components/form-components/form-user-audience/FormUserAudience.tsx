'use client'

import { AudienceFilters } from '@/api/mails-api/mail-jobs/mail-jobs.types'
import { UserLevel, UserStatus } from '@/api/users/users/users.types'
import { Languages } from '@/shared/types-enums/lans'
import FormSelect from '../form-select/FormSelect'
import c from './FormUserAudience.module.scss'
import {
	lansSelectData,
	userLevelSelectData,
	userStatusSelectData,
} from '@/shared/constants/form-select-data'

type Props = {
	audience: AudienceFilters | null
	onChange: (val: AudienceFilters | null) => void
}

const buildAudience = (
	lan: Languages | null,
	status: UserStatus | null,
	level: UserLevel | null,
): AudienceFilters | null => {
	const next: AudienceFilters = {}

	if (lan) next.language = [lan]
	if (status) next.status = [status]
	if (level) next.level = [level]

	return Object.keys(next).length ? next : null
}

const FormUserAudience: React.FC<Props> = ({ audience, onChange }) => {
	const currentLan = audience?.language?.[0] ?? null
	const currentStatus = audience?.status?.[0] ?? null
	const currentLevel = audience?.level?.[0] ?? null

	return (
		<div className={c.audience}>
			<p className={c.audience__title}>odfiltruj użytkowników</p>
			<FormSelect
				item={currentLan}
				onChange={(v: Languages | null) =>
					onChange(buildAudience(v, currentStatus, currentLevel))
				}
				options={lansSelectData}
				selectTitle="język"
			/>
			<FormSelect
				item={currentStatus}
				onChange={(v: UserStatus | null) =>
					onChange(buildAudience(currentLan, v, currentLevel))
				}
				options={userStatusSelectData}
				selectTitle="status użytkownika"
			/>

			<FormSelect
				item={currentLevel}
				onChange={(v: UserLevel | null) =>
					onChange(buildAudience(currentLan, currentStatus, v))
				}
				options={userLevelSelectData}
				selectTitle="poziom użytkownika"
			/>
		</div>
	)
}

export default FormUserAudience
