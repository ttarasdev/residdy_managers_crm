'use client'

import { useQuery } from '@tanstack/react-query'
import c from './FormConsCatsList.module.scss'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { consultationCategoriesApi } from '@/api/consultations-api/consultation-categories/consultation-categories.api'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import { formatDate } from '@/shared/lib/date'

interface Props {
	toggleItem: (id: number | null) => void
	activeItemId: number | null
}

const FormConsCatsList: React.FC<Props> = ({ toggleItem, activeItemId }) => {
	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.CONSULTATION_CATS],
		queryFn: () => {
			const params: Record<string, any> = {}
			return consultationCategoriesApi.list(params)
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

	return (
		<div className={c.items__container}>
			wybierz kategorię
			<div className={c.items}>
				{data.rows.map((i) => (
					<div
						key={i.id}
						onClick={() => toggleItem(i.id)}
						className={`${c.item} ${
							activeItemId === i.id ? c.active : ''
						}`}
					>
						<div className={c.item__info}>
							<p className={c.item__title}>{i.titlePl}</p>
							<p className={c.item__subtitle}>
								{formatDate(i.createdAt)}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default FormConsCatsList
