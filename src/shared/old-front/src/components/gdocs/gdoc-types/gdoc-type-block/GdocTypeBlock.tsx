'use client'

import { useState } from 'react'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { gdocsTypesApi } from '@/api/gdocs-api/gdocs-types/gdocs-types.api'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import c from './GdocTypeBlock.module.scss'
import ItemBlockTop from '@/components/page-block-components/item-page/item-block-top/ItemBlockTop'
import ItemBlockHeader from '@/components/page-block-components/item-page/item-block-header/ItemBlockHeader'
import { formatDate } from '@/shared/lib/date'
import GdocsTypeDocsList from '../gdocs-type-docs-list/GdocsTypeDocsList'
import GdocTypeChangeForm from '../gdoc-type-change-form/GdocTypeChangeForm'

interface Props {
	id: number
}

const GdocTypeBlock: React.FC<Props> = ({ id }) => {
	const [isChangeFormOpened, setIsChangeFormOpened] = useState(false)

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.GDOC_TYPES, id],
		queryFn: () => gdocsTypesApi.getById(id),
		placeholderData: keepPreviousData,
		staleTime: 60_000,
	})

	if (isLoading)
		return (
			<div className={c.block}>
				<PageBlockLoadingData />
			</div>
		)
	if (error || !data)
		return (
			<div className={c.block}>
				<PageBlockNoData />
			</div>
		)

	return (
		<div className={c.block}>
			<ItemBlockTop
				title={data.titlePL}
				icon={data.icon}
				setIsFormOpened={() => setIsChangeFormOpened(true)}
				subtitle={data.titleEN}
			/>
			<ItemBlockHeader
				id={data.id}
				status={data.status.toString()}
				isPopular={data.isPopular}
				createdAt={formatDate(data.createdAt)}
			/>
			<div className={c.block__row}>
				<GdocsTypeDocsList gDocTypeId={id} />
			</div>
			{isChangeFormOpened && (
				<GdocTypeChangeForm
					type={data}
					onClose={() => setIsChangeFormOpened(false)}
				/>
			)}
		</div>
	)
}

export default GdocTypeBlock
