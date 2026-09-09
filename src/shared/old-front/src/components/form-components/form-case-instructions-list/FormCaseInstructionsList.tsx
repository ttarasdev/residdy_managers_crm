'use client'

import { Languages } from '@/shared/types-enums/lans'
import c from './FormCaseInstructionsList.module.scss'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { caseInstructionsApi } from '@/api/cases-api/case-instructions/case-instructions.api'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import { CaseInstructionStatus } from '@/api/cases-api/case-instructions/case-instructions.types'

interface Props {
	lan: Languages
	chooseItem: (id: number) => void
	activeItemId: number | null
}

const FormCaseInstructionsList: React.FC<Props> = ({
	lan,
	chooseItem,
	activeItemId,
}) => {
	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.CASE_INSTRUCTIONS_KEY, lan],
		queryFn: () =>
			caseInstructionsApi.getAll({
				lan,
				status: CaseInstructionStatus.ACTIVE,
			}),
		placeholderData: keepPreviousData,
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

	return (
		<div className={c.items__container}>
			wybierz instrukcję
			<div className={c.items}>
				{data.rows.map((i) => (
					<div
						key={i.id}
						onClick={() => chooseItem(i.id)}
						className={`${c.item} ${
							i.id == activeItemId ? c.active : ''
						}`}
					>
						<div className={c.item__info}>
							<p className={c.item__title}>{i.title}</p>
							<p className={c.item__subtitle}>{i.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default FormCaseInstructionsList
