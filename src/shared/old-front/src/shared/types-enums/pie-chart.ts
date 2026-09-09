export interface PieChartItem {
	id: number | string
	label: string
	value: number
	color?: string
}

export interface PieChartData {
	title: string
	total?: number
	items: PieChartItem[]
}
