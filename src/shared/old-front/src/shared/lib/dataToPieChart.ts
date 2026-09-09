import { CasesResponse, CaseStatus } from '@/api/cases-api/cases/cases.type'
import { PieChartData, PieChartItem } from '../types-enums/pie-chart'

export const mapCasesToStatusPieChart = (
	response: CasesResponse,
): PieChartData => {
	const statusMap: Record<CaseStatus, number> = {
		[CaseStatus.DRAFT]: 0,
		[CaseStatus.ACTIVE]: 0,
		[CaseStatus.ARCHIVED]: 0,
	}

	for (const item of response.rows) {
		statusMap[item.status]++
	}

	const items: PieChartItem[] = [
		{
			id: CaseStatus.DRAFT,
			label: 'Drafty',
			value: statusMap[CaseStatus.DRAFT],
			color: '#EF4444',
		},
		{
			id: CaseStatus.ACTIVE,
			label: 'Aktywne',
			value: statusMap[CaseStatus.ACTIVE],
			color: '#22C55E',
		},
		{
			id: CaseStatus.ARCHIVED,
			label: 'Archiwowane',
			value: statusMap[CaseStatus.ARCHIVED],
			color: '#9CA3AF',
		},
	]

	return {
		title: 'Status spraw legalizacji',
		total: response.count,
		items,
	}
}
