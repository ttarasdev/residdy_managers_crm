'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import c from './SpecialistsBlock.module.scss'
import { useState } from 'react'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { specialistsApi } from '@/api/specialists/specialists/specialists.api'
import PageBlockHeader from '@/components/page-block-components/page-block-header/PageBlockHeader'
import { SpecialistStatus } from '@/api/specialists/specialists/specialists.types'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import PageBlockChangePage from '@/components/page-block-components/page-block-change-page/PageBlockChangePage'
import SpecialistsCards from '../specialists-cards/SpecialistsCards'
import SpecialistAddForm from '../specialist-add-form/SpecialistAddForm'

const SpecialistsBlock = () => {
	const [isFormOpened, setIsFormOpened] = useState(false)
	const [page, setPage] = useState<number>(1)
	const [status, setStatus] = useState<SpecialistStatus | null>(null)

	const limit = 9

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.CASES_KEY, page, status],
		queryFn: () => {
			const offset = (page - 1) * limit
			const params: Record<string, any> = {
				offset,
				limit,
			}
			if (status) params.status = status

			return specialistsApi.list(params)
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

	return (
		<div className={c.block}>
			<PageBlockHeader<SpecialistStatus>
				title="Zarządzaj partnerami"
				openAddForm={() => setIsFormOpened(true)}
				status={status}
				setStatus={setStatus as any}
			/>
			<SpecialistsCards data={data.rows} />
			<PageBlockChangePage
				page={page}
				setPage={setPage}
				maxPage={maxPage}
			/>
			{isFormOpened && (
				<SpecialistAddForm onClose={() => setIsFormOpened(false)} />
			)}
		</div>
	)
}

export default SpecialistsBlock
