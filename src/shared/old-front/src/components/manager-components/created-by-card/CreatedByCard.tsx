'use client'

import c from './CreatedByCard.module.scss'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import PageBlockCard from '@/components/page-block-components/page-block-cards/page-block-card/PageBlockCard'
import { managerApi } from '@/api/manager-api/manager/manager.api'

interface Props {
	id: number
}

const CreatedByCard: React.FC<Props> = ({ id }) => {
	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.MANAGERS, id],
		queryFn: () => managerApi.getById(id),
		placeholderData: keepPreviousData,
	})

	if (isLoading)
		return (
			<div className={c.card}>
				<PageBlockLoadingData />
			</div>
		)
	if (error || !data)
		return (
			<div className={c.card}>
				<PageBlockNoData />
			</div>
		)

	return (
		<PageBlockCard
			id={data.id}
			variantId={data.avatarId}
			title={`${data.name} ${data.surname}`}
			subtitle={data.email}
			infoBlock={data.phone}
			info={data.location}
			leftStatus={data.status}
			leftStatusIcon="/block_icons/settings_orange.svg"
			rightStatus={data.position}
			rightStatusIcon="/block_icons/person_green.svg"
		/>
	)
}

export default CreatedByCard
