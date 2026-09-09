'use client'

import { useState } from 'react'
import c from './EmployeesBlock.module.scss'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import PageBlockHeader from '@/components/page-block-components/page-block-header/PageBlockHeader'
import EmployeesCards from '../employees-cards/EmployeesCards'
import EmployeesAddForm from '../employees-add-form/EmployeesAddForm'
import { managerApi } from '@/api/manager-api/manager/manager.api'

const EmployeesBlock = () => {
	const [isFormOpened, setIsFormOpened] = useState(false)

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.MANAGERS],
		queryFn: () => managerApi.getAll({}),
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

	return (
		<div className={c.block}>
			<PageBlockHeader
				title="Zarządzaj swoim zespołem"
				openAddForm={() => setIsFormOpened(true)}
			/>
			<EmployeesCards data={data} />
			{isFormOpened && (
				<EmployeesAddForm onClose={() => setIsFormOpened(false)} />
			)}
		</div>
	)
}

export default EmployeesBlock
