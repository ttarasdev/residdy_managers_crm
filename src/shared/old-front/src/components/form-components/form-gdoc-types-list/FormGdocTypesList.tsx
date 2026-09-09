'use client'

import c from './FormGdocTypesList.module.scss'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { blogCategoriesApi } from '@/api/blog-api/blog-categories/blogCategories.api'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import { formatDate } from '@/shared/lib/date'
import { gdocsTypesApi } from '@/api/gdocs-api/gdocs-types/gdocs-types.api'

interface Props {
	toggleItem: (id: number | null) => void
	activeItemId: number | null
}

const FormGdocTypesList: React.FC<Props> = ({ toggleItem, activeItemId }) => {
	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.GDOCS],
		queryFn: () => {
			const params: Record<string, any> = {}
			return gdocsTypesApi.list(params)
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
				{data.items.map((i) => (
					<div
						key={i.id}
						onClick={() => toggleItem(i.id)}
						className={`${c.item} ${
							activeItemId === i.id ? c.active : ''
						}`}
					>
						<div className={c.item__info}>
							<p className={c.item__title}>{i.titlePL}</p>
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

export default FormGdocTypesList
