'use client'

import c from './FormSelect.module.scss'
import { useState } from 'react'

interface Props {
	options: {
		title: string
		value: any
	}[]
	onChange: (item: any) => void
	item: any
	selectTitle: string
	placeholder?: string
}

const FormSelect: React.FC<Props> = ({
	options,
	item,
	onChange,
	selectTitle,
	placeholder = 'Wybierz',
}) => {
	const [open, setOpen] = useState(false)

	return (
		<div className={c.label}>
			{selectTitle}
			<div className={c.select}>
				<button
					type="button"
					className={`${c.select__trigger} ${open ? c.open : ''}`}
					onClick={() => setOpen((v) => !v)}
				>
					<span>
						{options.find((o) => o.value === item)?.title ??
							placeholder}
					</span>
					<span className={c.arrow} />
				</button>

				{open && (
					<div className={c.select__list}>
						{options.map((opt) => (
							<button
								key={opt.value}
								type="button"
								className={c.select__item}
								onClick={() => {
									onChange(opt.value)
									setOpen(false)
								}}
							>
								{opt.title}
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default FormSelect
