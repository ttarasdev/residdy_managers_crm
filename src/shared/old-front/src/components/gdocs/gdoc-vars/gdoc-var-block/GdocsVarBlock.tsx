'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import c from './GdocsVarBlock.module.scss'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { gdocsVarsApi } from '@/api/gdocs-api/gdocs-vars/gdocs-vars.api'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import ItemBlockTop from '@/components/page-block-components/item-page/item-block-top/ItemBlockTop'
import ItemBlockHeader from '@/components/page-block-components/item-page/item-block-header/ItemBlockHeader'
import { formatDate } from '@/shared/lib/date'

interface Props {
	id: number
}

const GdocsVarBlock: React.FC<Props> = ({ id }) => {
	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.GDOC_VARS, id],
		queryFn: () => gdocsVarsApi.getById(id),
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
			<ItemBlockTop title={data.key} subtitle={data.labelPL} />
			<ItemBlockHeader
				id={data.id}
				createdAt={formatDate(data.createdAt)}
			/>
			<div className={c.block__row}>
				<div className={c.block__info}>
					<p className={c.block__label}>zmienna: {data.key}</p>
					<p className={c.block__label}>label pl: {data.labelPL}</p>
					<p className={c.block__label}>label ua: {data.labelUA}</p>
					<p className={c.block__label}>label en: {data.labelEN}</p>
					<p className={c.block__label}>label ru: {data.labelRU}</p>
				</div>
			</div>
		</div>
	)
}

export default GdocsVarBlock
