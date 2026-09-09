'use client'

import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import c from './PieChart.module.scss'
import { PieChartData } from '@/shared/types-enums/pie-chart'
import PageBlockHeader from '@/components/page-block-components/page-block-header/PageBlockHeader'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
	data: PieChartData
}

const PieChart: React.FC<Props> = ({ data }) => {
	const labels = data.items.map((i) => i.label)
	const values = data.items.map((i) => i.value)
	const colors = data.items.map((i) => i.color ?? '#CBD5E1')

	const chartData = {
		labels,
		datasets: [
			{
				data: values,
				backgroundColor: colors,
				borderWidth: 0,
			},
		],
	}

	return (
		<div className={c.chart}>
			<PageBlockHeader title={data.title} />
			<div className={c.chart__canvas}>
				<Doughnut
					data={chartData}
					options={{
						cutout: '70%',
						plugins: {
							legend: {
								display: false,
							},
							tooltip: {
								callbacks: {
									label: (ctx) => `${ctx.label}: ${ctx.raw}`,
								},
							},
						},
					}}
				/>
			</div>

			<div className={c.chart__legend}>
				{data.items.map((item) => (
					<div key={item.id} className={c.chart__legendItem}>
						<span
							className={c.chart__dot}
							style={{
								backgroundColor: item.color ?? '#CBD5E1',
							}}
						/>
						<span className={c.chart__label}>{item.label}</span>
						<span className={c.chart__value}>{item.value}</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default PieChart
