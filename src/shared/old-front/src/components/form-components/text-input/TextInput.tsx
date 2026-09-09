'use client'

import c from './TextInput.module.scss'

interface Props {
	inputTitle: string
	value: string | null
	onChange: (val: string | null) => void
}

const TextInput: React.FC<Props> = ({ inputTitle, value, onChange }) => {
	return (
		<div className={c.label}>
			{inputTitle}
			<input
				type="text"
				className={c.input}
				value={value ?? ''}
				required
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	)
}

export default TextInput
