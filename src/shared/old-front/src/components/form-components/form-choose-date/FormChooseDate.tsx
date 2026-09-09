'use client'

import c from './FormChooseDate.module.scss'

interface Props {
	inputTitle: string
	value: string | null
	onChange: (val: string | null) => void
	required?: boolean
}

const FormChooseDate: React.FC<Props> = ({
	inputTitle,
	value,
	onChange,
	required,
}) => {
	return (
		<label className={c.label}>
			{inputTitle}
			<input
				type="datetime-local"
				className={c.input}
				value={value ?? ''}
				required={!!required}
				onChange={(e) => onChange(e.target.value || null)}
			/>
		</label>
	)
}

export default FormChooseDate
