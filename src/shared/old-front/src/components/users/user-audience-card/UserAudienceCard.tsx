'use client'

import { AudienceFilters } from '@/api/mails-api/mail-jobs/mail-jobs.types'
import c from './UserAudienceCard.module.scss'
import { parseAudience } from '@/shared/lib/parse-audience'

interface Props {
	audience: AudienceFilters
}

const UserAudienceCard: React.FC<Props> = ({ audience }) => {
	const a = parseAudience(audience as any)

	return (
		<div className={c.aud}>
			<div className={c.aud__item}>
				<p className={c.aud__title}>języki</p>
				<p className={c.aud__values}>
					{a.language ? (
						a.language.map((i) => (
							<span className={c.aud__value} key={i}>
								{i}
							</span>
						))
					) : (
						<span className={c.aud__value}>wszystkie</span>
					)}
				</p>
			</div>
			<div className={c.aud__item}>
				<p className={c.aud__title}>status użytkownika</p>
				<p className={c.aud__values}>
					{a.status ? (
						a.status.map((i) => (
							<span className={c.aud__value} key={i}>
								{i}
							</span>
						))
					) : (
						<span className={c.aud__value}>wszystkie</span>
					)}
				</p>
			</div>
			<div className={c.aud__item}>
				<p className={c.aud__title}>poziom</p>
				<p className={c.aud__values}>
					{a.level ? (
						a.level.map((i) => (
							<span className={c.aud__value} key={i}>
								{i}
							</span>
						))
					) : (
						<span className={c.aud__value}>wszystkie</span>
					)}
				</p>
			</div>
		</div>
	)
}

export default UserAudienceCard
