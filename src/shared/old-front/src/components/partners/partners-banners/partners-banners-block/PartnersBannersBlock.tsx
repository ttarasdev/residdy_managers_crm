'use client'

import { useState } from 'react'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { partnersBannersApi } from '@/api/partners-api/partner-banners/partners-banners.api'
import { mapPartnerBannersToTableRows } from '@/shared/lib/dataToTableMap'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import c from './PartnersBannersBlock.module.scss'
import PageBlockHeader from '@/components/page-block-components/page-block-header/PageBlockHeader'
import { PAGE_PATHS } from '@/shared/types-enums/paths'
import PageBlockTable from '@/components/page-block-components/page-block-table/PageBlockTable'
import PageBlockChangePage from '@/components/page-block-components/page-block-change-page/PageBlockChangePage'
import PartnersBannersAddForm from '../partners-banners-add-form/PartnersBannersAddForm'

interface Props {
	partnerId: number
}

const PartnersBannersBlock: React.FC<Props> = ({ partnerId }) => {
	const [isFormOpened, setIsFormOpened] = useState(false)
	const [page, setPage] = useState<number>(1)

	const limit = 8

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.PARTNER_BANNERS, partnerId, page],
		queryFn: () => {
			const offset = (page - 1) * limit
			const params: Record<string, any> = {
				offset,
				limit,
				partnerId,
			}

			return partnersBannersApi.list(params)
		},
		placeholderData: keepPreviousData,
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

	const maxPage = Math.ceil(data.total / limit)
	const tableData = mapPartnerBannersToTableRows(data.items)

	return (
		<div className={c.block}>
			<PageBlockHeader
				title="Banery"
				openAddForm={() => setIsFormOpened(true)}
			/>
			<PageBlockTable
				itemPath={`${PAGE_PATHS.PARTNERS}/${partnerId}/banners`}
				data={tableData}
			/>
			<PageBlockChangePage
				page={page}
				setPage={setPage}
				maxPage={maxPage}
			/>
			{isFormOpened && (
				<PartnersBannersAddForm
					partnerId={partnerId}
					onClose={() => setIsFormOpened(false)}
				/>
			)}
		</div>
	)
}

export default PartnersBannersBlock
