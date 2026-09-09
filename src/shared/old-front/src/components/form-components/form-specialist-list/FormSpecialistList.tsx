'use client'

import c from './FormSpecialistList.module.scss'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import { specialistsApi } from '@/api/specialists/specialists/specialists.api'

interface Props {
	chooseItem: (id: number) => void
	activeItemId: number | null
}

const FormSpecialistList: React.FC<Props> = ({ chooseItem, activeItemId }) => {
	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.SPECIALISTS],
		queryFn: () => specialistsApi.list({}),
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
			wybierz specjalistę
			<div className={c.items}>
				{data.rows.map((i) => (
					<div
						key={i.id}
						onClick={() => chooseItem(i.id)}
						className={`${c.item} ${
							i.id === activeItemId ? c.active : ''
						}`}
					>
						<div className={c.item__info}>
							<p className={c.item__title}>
								{i.name} {i.surname}
							</p>
							<p className={c.item__subtitle}>{i.email}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default FormSpecialistList
