'use client'

import c from './FormGdocVarsList.module.scss'
import { useQuery } from '@tanstack/react-query'
import { gdocsVarsApi } from '@/api/gdocs-api/gdocs-vars/gdocs-vars.api'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'

interface Props {
	toggleItem: (id: number) => void
	activeItems: number[]
}

const FormGdocVarsList: React.FC<Props> = ({ toggleItem, activeItems }) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['gdocs-vars'],
		queryFn: () => {
			return gdocsVarsApi.list({
				page: 1,
				limit: 100,
			})
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
			wybierz zmienne
			<div className={c.items}>
				{data.items.map((i) => (
					<div
						key={i.id}
						onClick={() => toggleItem(i.id)}
						className={`${c.item} ${
							activeItems.includes(i.id) ? c.active : ''
						}`}
					>
						<div className={c.item__info}>
							<p className={c.item__title}>{i.labelPL}</p>
							<p className={c.item__subtitle}>{i.key}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default FormGdocVarsList
