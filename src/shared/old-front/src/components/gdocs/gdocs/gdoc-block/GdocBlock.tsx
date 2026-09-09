'use client'

import { useState } from 'react'
import c from './GdocBlock.module.scss'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { gdocsApi } from '@/api/gdocs-api/gdocs/gdocs.api'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import ItemBlockTop from '@/components/page-block-components/item-page/item-block-top/ItemBlockTop'
import ItemBlockHeader from '@/components/page-block-components/item-page/item-block-header/ItemBlockHeader'
import { formatDate } from '@/shared/lib/date'
import GdocsChangeForm from '../gdocs-change-form/GdocsChangeForm'

interface Props {
	id: number
}

const GdocBlock: React.FC<Props> = ({ id }) => {
	const [isChangeFormOpened, setIsChangeFormOpened] = useState(false)

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.GDOCS, id],
		queryFn: () => gdocsApi.getById(id),
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
				subtitle={data.originalFileName}
			/>
			<ItemBlockHeader
				id={data.id}
				status={data.status.toString()}
				createdAt={formatDate(data.createdAt)}
			/>
			<div className={c.block__row}>
				<div className={c.block__info}>
					<p className={c.block__label}>nazwa pl: {data.titlePL}</p>
					<p className={c.block__label}>nazwa ua: {data.titleUA}</p>
					<p className={c.block__label}>nazwa en: {data.titleEN}</p>
					<p className={c.block__label}>nazwa ru: {data.titleRU}</p>
				</div>
				<div className={c.block__info}>
					<div className={c.block__vars}>
						{data.variables &&
							data.variables.map((i) => (
								<span key={i.id}>{i.key}</span>
							))}
					</div>
				</div>
			</div>
			{isChangeFormOpened && (
				<GdocsChangeForm
					gdoc={data}
					onClose={() => setIsChangeFormOpened(false)}
				/>
			)}
		</div>
	)
}

export default GdocBlock
