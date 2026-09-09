'use client'

import { useState } from 'react'
import c from './PromocodesBlock.module.scss'
import { PromocodeStatus } from '@/api/promo-api/promocodes/promocodes.types'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import { promocodesApi } from '@/api/promo-api/promocodes/promocodes.api'
import PromocodesAddForm from '../promocodes-add-form/PromocodesAddForm'
import PageBlockHeader from '@/components/page-block-components/page-block-header/PageBlockHeader'
import { promocodeStatusSelectData } from '@/shared/constants/form-select-data'
import PageBlockChangePage from '@/components/page-block-components/page-block-change-page/PageBlockChangePage'
import PageBlockTable from '@/components/page-block-components/page-block-table/PageBlockTable'
import { PAGE_PATHS } from '@/shared/types-enums/paths'
import { mapPromocodesToTableRows } from '@/shared/lib/dataToTableMap'

const PromocodesBlock = () => {
	const [isFormOpened, setIsFormOpened] = useState(false)
	const [page, setPage] = useState<number>(1)
	const [status, setStatus] = useState<PromocodeStatus | null>(null)

	const limit = 8

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.PROMOCODES, status, page],
		queryFn: () => {
			const offset = (page - 1) * limit
			const params: Record<string, any> = {
				page,
				offset,
				limit,
			}
			if (status) params.status = status
			return promocodesApi.list(params)
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

	const maxPage = Math.ceil(data.count / limit)

	const tableData = mapPromocodesToTableRows(data.rows)

	return (
		<div className={c.block}>
			<PageBlockHeader<PromocodeStatus>
				status={status}
				setStatus={setStatus}
				statusItems={promocodeStatusSelectData}
				title="Lista promokodów"
				openAddForm={() => setIsFormOpened(true)}
			/>
			<PageBlockTable itemPath={PAGE_PATHS.PROMO} data={tableData} />
			<PageBlockChangePage
				page={page}
				setPage={setPage}
				maxPage={maxPage}
			/>
			{isFormOpened && (
				<PromocodesAddForm onClose={() => setIsFormOpened(false)} />
			)}
		</div>
	)
}

export default PromocodesBlock
