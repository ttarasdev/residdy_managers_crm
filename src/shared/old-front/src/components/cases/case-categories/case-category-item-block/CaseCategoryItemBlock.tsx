'use client'

import {
	keepPreviousData,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query'
import c from './CaseCategoryItemBlock.module.scss'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { caseTypesApi } from '@/api/cases-api/cases-types/case-types.api'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import { useState } from 'react'
import ItemBlockTop from '@/components/page-block-components/item-page/item-block-top/ItemBlockTop'
import { formatDate } from '@/shared/lib/date'
import ItemBlockHeader from '@/components/page-block-components/item-page/item-block-header/ItemBlockHeader'
import CaseCategoryChangeForm from '../case-category-change-form/CaseCategoryChangeForm'
import CaseCategoryCasesList from '../case-category-cases-list/CaseCategoryCasesList'

interface Props {
	id: number
}

const CaseCategoryItemBlock: React.FC<Props> = ({ id }) => {
	const [isChangeFormOpened, setIsChangeFormOpened] = useState(false)

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.CASE_TYPES_KEY, id],
		queryFn: () => caseTypesApi.getOne(id),
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
				title={data.title}
				icon={data.icon}
				setIsFormOpened={() => setIsChangeFormOpened(true)}
				secondButtonTitle="kopiuj"
			/>
			<ItemBlockHeader
				id={data.id}
				lan={data.lan}
				status={data.status.toString()}
				isPopular={data.isPopular}
				createdAt={formatDate(data.createdAt)}
			/>
			<div className={c.block__row}>
				<CaseCategoryCasesList caseTypeId={id} />
			</div>
			{isChangeFormOpened && (
				<CaseCategoryChangeForm
					data={data}
					onClose={() => setIsChangeFormOpened(false)}
				/>
			)}
		</div>
	)
}

export default CaseCategoryItemBlock
