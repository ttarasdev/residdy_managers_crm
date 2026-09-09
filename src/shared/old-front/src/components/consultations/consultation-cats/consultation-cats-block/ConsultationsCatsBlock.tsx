'use client'

import { useState } from 'react'
import c from './ConsultationsCatsBlock.module.scss'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { consultationCategoriesApi } from '@/api/consultations-api/consultation-categories/consultation-categories.api'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import { mapConsultationCategoriesToTableRows } from '@/shared/lib/dataToTableMap'
import PageBlockHeader from '@/components/page-block-components/page-block-header/PageBlockHeader'
import { isActiveSelectData } from '@/shared/constants/form-select-data'
import PageBlockTable from '@/components/page-block-components/page-block-table/PageBlockTable'
import { PAGE_PATHS } from '@/shared/types-enums/paths'
import PageBlockChangePage from '@/components/page-block-components/page-block-change-page/PageBlockChangePage'
import ConsultationCatsAddForm from '../consultation-cats-add-form/ConsultationCatsAddForm'

const ConsultationsCatsBlock = () => {
	const [isFormOpened, setIsFormOpened] = useState(false)
	const [page, setPage] = useState<number>(1)
	const [isActive, setIsActive] = useState<Boolean | null>(null)
	const [isPopular, setIsPopular] = useState<boolean | null>(null)

	const limit = 8

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.CONSULTATION_CATS, isActive, isPopular, page],
		queryFn: () => {
			const offset = (page - 1) * limit
			const params: Record<string, any> = {
				offset,
				limit,
			}
			if (isActive) params.isActive = isActive
			if (isPopular) params.isPopular = isPopular
			return consultationCategoriesApi.list(params)
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

	const maxPage = Math.ceil(data.count / 8)

	const tableData = mapConsultationCategoriesToTableRows(data.rows)

	return (
		<div className={c.block}>
			<PageBlockHeader<Boolean>
				isPopular={isPopular}
				setIsPopular={setIsPopular}
				status={isActive}
				setStatus={setIsActive}
				statusItems={isActiveSelectData}
				title="Lista kategorii konsultacji"
				openAddForm={() => setIsFormOpened(true)}
			/>
			<PageBlockTable
				itemPath={PAGE_PATHS.CONSULTATION_CATS_PATH}
				data={tableData}
			/>
			<PageBlockChangePage
				page={page}
				setPage={setPage}
				maxPage={maxPage}
			/>
			{isFormOpened && (
				<ConsultationCatsAddForm
					onClose={() => setIsFormOpened(false)}
				/>
			)}
		</div>
	)
}

export default ConsultationsCatsBlock
