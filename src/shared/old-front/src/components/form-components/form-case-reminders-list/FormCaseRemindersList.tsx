'use client'

import { Languages } from '@/shared/types-enums/lans'
import c from './FormCaseRemindersList.module.scss'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { caseRemindersApi } from '@/api/cases-api/case-reminders/case-reminders.api'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'

interface Props {
	activeItemId: number | null
	chooseItem: (id: number | null) => void
	lan: Languages
}

const FormCaseRemindersList: React.FC<Props> = ({
	activeItemId,
	chooseItem,
	lan,
}) => {
	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.CASE_REMINDERS_KEY],
		queryFn: () => {
			const params: Record<string, any> = {
				lan,
			}
			return caseRemindersApi.getAll(params)
		},
	})

	if (isLoading)
		return (
			<div className={c.items__container}>
				<PageBlockLoadingData />
			</div>
		)

	if (error || !data)
		return (
			<div className={c.items__container}>
				<PageBlockNoData />
			</div>
		)

	const filteredData = data.rows.filter((item) => item.lan === lan)

	if (!filteredData.length)
		return (
			<div className={c.items__container}>
				<PageBlockNoData />
			</div>
		)

	return (
		<div className={c.items__container}>
			wybierz przypomniałkę do zadania
			<div className={c.items}>
				{filteredData.map((i) => (
					<div
						key={i.id}
						onClick={() => chooseItem(i.id)}
						className={`${c.item} ${
							i.id === activeItemId ? c.active : ''
						}`}
					>
						<div className={c.item__info}>
							<p className={c.item__title}>{i.topic}</p>
							<p className={c.item__subtitle}>{i.lan}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default FormCaseRemindersList
