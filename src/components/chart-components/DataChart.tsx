'use client'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Tooltip,
    Legend,
    type ChartOptions,
} from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'
import { useTheme } from '../../shared/theme/theme'
import c from './DataChart.module.scss'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Tooltip,
    Legend,
)

interface Props {
    title: string
    kind: 'line' | 'bar'
    labels: string[]
    series: { label: string; values: number[] }[]
    note?: string
    showTitle?: boolean
}

export default function DataChart({
    title,
    kind,
    labels,
    series,
    note,
    showTitle = true,
}: Props) {
    const { theme } = useTheme()

    const dark = theme === 'black'

    const colors = dark
        ? ['#a4aab7', '#7da2d6', '#b7c9e2', '#8c86b8', '#647fa7', '#d0d8e5']
        : ['#171c26', '#5078ac', '#6c7689', '#77719b', '#8fa9c9', '#a4aab7']

    const data = {
        labels,
        datasets: series.map((item, index) => ({
            label: item.label,
            data: item.values,
            borderColor: colors[index % colors.length],
            backgroundColor: colors[index % colors.length],
            borderWidth: 2,
            pointRadius: labels.length > 60 ? 0 : 3,
            pointHoverRadius: 5,
            tension: 0.15,
            borderRadius: 5,
            maxBarThickness: 42,
        })),
    }

    const options: ChartOptions<'line' | 'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: {
                display: series.length > 1,
                position: 'bottom',
                labels: {
                    color: dark ? '#a4aab7' : '#6c7689',
                    usePointStyle: true,
                    boxWidth: 8,
                    padding: 18,
                },
            },
            tooltip: { padding: 12, backgroundColor: '#171c26' },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    color: dark ? '#a4aab7' : '#6c7689',
                    maxTicksLimit: 8,
                    callback(value) {
                        const text = this.getLabelForValue(Number(value))

                        return text.length > 28 ? `${text.slice(0, 27)}…` : text
                    },
                },
            },
            y: {
                beginAtZero: true,
                border: { display: false },
                grid: { color: dark ? '#30394b' : '#eef0f4' },
                ticks: { precision: 0, color: dark ? '#a4aab7' : '#6c7689' },
            },
        },
    }

    return (
        <div className={c.chart}>
            {(showTitle || note) && (
                <div className={c.heading}>
                    {showTitle && <h3>{title}</h3>}
                    {note && <p>{note}</p>}
                </div>
            )}
            <div className={c.canvas}>
                {kind === 'line' ? (
                    <Line
                        data={data}
                        options={options as ChartOptions<'line'>}
                        role="img"
                        aria-label={title}
                    />
                ) : (
                    <Bar
                        data={data}
                        options={options as ChartOptions<'bar'>}
                        role="img"
                        aria-label={title}
                    />
                )}
            </div>
        </div>
    )
}
