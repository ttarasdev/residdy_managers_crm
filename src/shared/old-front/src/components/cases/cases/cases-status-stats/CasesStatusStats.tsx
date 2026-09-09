'use client'

import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import c from './CasesStatusStats.module.scss'
import { casesApi } from '@/api/cases-api/cases/cases.api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { mapCasesToStatusPieChart } from '@/shared/lib/dataToPieChart'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import PieChart from '@/components/statistics-components/pie-chart/PieChart'

const CasesStatusStats = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.CASES_KEY],
		queryFn: () => casesApi.list(),
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

	const pieChartData = mapCasesToStatusPieChart(data)

	return (
		<div className={c.block}>
			<PieChart data={pieChartData} />
		</div>
	)
}

export default CasesStatusStats
