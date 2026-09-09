'use client'

import { useState } from 'react'
import c from './ConsultationCatBlock.module.scss'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { consultationCategoriesApi } from '@/api/consultations-api/consultation-categories/consultation-categories.api'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import ItemBlockTop from '@/components/page-block-components/item-page/item-block-top/ItemBlockTop'
import ItemBlockHeader from '@/components/page-block-components/item-page/item-block-header/ItemBlockHeader'
import { formatDate } from '@/shared/lib/date'
import ConsultationCatChangeForm from '../consultation-cat-change-form/ConsultationCatChangeForm'

interface Props {
	id: number
}

const ConsultationCatBlock: React.FC<Props> = ({ id }) => {
	const [isChangeFormOpened, setIsChangeFormOpened] = useState(false)

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.CONSULTATION_CATS, id],
		queryFn: () => consultationCategoriesApi.getById(id),
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
				title={data.titlePl}
				icon={data.icon}
				setIsFormOpened={() => setIsChangeFormOpened(true)}
				subtitle={data.titleEn}
			/>
			<ItemBlockHeader
				id={data.id}
				status={data.isActive ? 'aktywny' : 'nieaktywny'}
				createdAt={formatDate(data.createdAt)}
				isPopular={data.isPopular}
			/>
			{isChangeFormOpened && (
				<ConsultationCatChangeForm
					type={data}
					onClose={() => setIsChangeFormOpened(false)}
				/>
			)}
		</div>
	)
}

export default ConsultationCatBlock
