'use client'

import { useQuery } from '@tanstack/react-query'
import c from './FormRolesList.module.scss'
import { rolesApi } from '@/api/manager-api/roles/roles.api'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'

interface Props {
	toggleItem: (id: number) => void
	activeItems: number[]
}

const FormRolesList: React.FC<Props> = ({ toggleItem, activeItems }) => {
	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.ROLES],
		queryFn: () => rolesApi.list(),
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
				{data.map((i) => (
					<div
						key={i.id}
						onClick={() => toggleItem(i.id)}
						className={`${c.item} ${
							activeItems.includes(i.id) ? c.active : ''
						}`}
					>
						<div className={c.item__info}>
							<p className={c.item__title}>{i.name}</p>
							<p className={c.item__subtitle}>id: {i.id}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default FormRolesList
