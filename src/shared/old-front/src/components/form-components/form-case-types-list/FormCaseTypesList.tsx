'use client'

import { Languages } from '@/shared/types-enums/lans'
import c from './FormCaseTypesList.module.scss'
import { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { caseTypesApi } from '@/api/cases-api/cases-types/case-types.api'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import { CaseTypeStatus } from '@/api/cases-api/cases-types/case-types.types'
import { IconContainer } from '@/components/library/icon-container/IconContainer'

interface Props {
	lan: Languages | null
	chooseItem: (id: number) => void
	activeItemId: number | null
}

const FormCaseTypesList: React.FC<Props> = ({
	lan,
	chooseItem,
	activeItemId,
}) => {
	const [isPopupVisible, setIsPopupVisible] = useState(false)

	const toggleItem = (id: number) => {
		if (lan) {
			chooseItem(id)
		} else {
			setIsPopupVisible(true)

			setTimeout(() => {
				setIsPopupVisible(false)
			}, 2000)
		}
	}

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.CASE_TYPES_KEY, lan, CaseTypeStatus.ACTIVE],
		queryFn: () => {
			const params: Record<string, any> = {
				status: CaseTypeStatus.ACTIVE,
			}
			if (lan !== null) params.lan = lan
			return caseTypesApi.list(params)
		},
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
			wybierz typ sprawy
			<div className={c.items}>
				{!isPopupVisible &&
					data.rows.map((i) => (
						<div
							key={i.id}
							onClick={() => toggleItem(i.id)}
							className={`${c.item} ${
								i.id == activeItemId ? c.active : ''
							}`}
						>
							<div className={c.item__image}>
								<IconContainer item={i.icon} />
							</div>
							<div className={c.item__info}>
								<p className={c.item__title}>{i.title}</p>
								<p className={c.item__subtitle}>
									{i.description}
								</p>
							</div>
						</div>
					))}
				{isPopupVisible && (
					<div className={c.items__popup}>wybierz najperw język</div>
				)}
			</div>
		</div>
	)
}

export default FormCaseTypesList
