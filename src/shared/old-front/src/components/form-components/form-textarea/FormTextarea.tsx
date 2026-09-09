'use client'

import c from './FormTextarea.module.scss'

interface Props {
	inputTitle: string
	value: string | null
	onChange: (val: string | null) => void
	placeholder?: string
	disabled?: boolean
	required?: boolean
}

const FormTextarea: React.FC<Props> = ({
	inputTitle,
	value,
	onChange,
	placeholder,
	disabled,
	required,
}) => {
	return (
		<div className={c.label}>
			{inputTitle}
			<textarea
				className={c.textarea}
				value={value ?? ''}
				placeholder={placeholder}
				disabled={disabled}
				required={required}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	)
}

export default FormTextarea
