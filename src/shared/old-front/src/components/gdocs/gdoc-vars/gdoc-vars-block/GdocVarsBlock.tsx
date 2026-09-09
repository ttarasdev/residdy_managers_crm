'use client'

import { useState } from 'react'
import c from './GdocVarsBlock.module.scss'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { gdocsVarsApi } from '@/api/gdocs-api/gdocs-vars/gdocs-vars.api'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import { mapGdocVarsToTableRows } from '@/shared/lib/dataToTableMap'
import PageBlockHeader from '@/components/page-block-components/page-block-header/PageBlockHeader'
import PageBlockTable from '@/components/page-block-components/page-block-table/PageBlockTable'
import { PAGE_PATHS } from '@/shared/types-enums/paths'
import PageBlockChangePage from '@/components/page-block-components/page-block-change-page/PageBlockChangePage'
import GdocVarsAddForm from '../gdoc-vars-add-fom/GdocVarsAddForm'

const GdocVarsBlock = () => {
	const [isFormOpened, setIsFormOpened] = useState(false)
	const [page, setPage] = useState<number>(1)

	const limit = 12

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.GDOC_VARS, page],
		queryFn: () => {
			const offset = (page - 1) * limit
			const params: Record<string, any> = {
				page,
				offset,
				limit,
			}
			return gdocsVarsApi.list(params)
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

	const tableData = mapGdocVarsToTableRows(data.items)

	return (
		<div className={c.block}>
			<PageBlockHeader
				title="Lista kategorii generowania plików"
				openAddForm={() => setIsFormOpened(true)}
			/>
			<PageBlockTable itemPath={PAGE_PATHS.GDOCS_VARS} data={tableData} />
			<PageBlockChangePage
				page={page}
				setPage={setPage}
				maxPage={maxPage}
			/>
			{isFormOpened && (
				<GdocVarsAddForm onClose={() => setIsFormOpened(false)} />
			)}
		</div>
	)
}

export default GdocVarsBlock
