'use client'

import { ThemedIcon } from '../../theme-icon/ThemedIcon'
import c from './AuthFormInput.module.scss'

interface Props {
	labelTitle: string
	iconPath: string
	value: string
	onChange: (v: string) => void
	type: string
	placeholder?: string
}

const AuthFormInput: React.FC<Props> = ({
	labelTitle,
	iconPath,
	value,
	onChange,
	type,
	placeholder,
}) => {
	return (
		<div className={c.input__container}>
			<div className={c.input__box}>
				<ThemedIcon path={iconPath} width={25} height={25} />
			</div>

			<span className={c.input__branch} />

			<div className={c.input__body}>
				<label>{labelTitle}</label>
				<input
					placeholder={placeholder ? placeholder : ''}
					type={type}
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>
			</div>
		</div>
	)
}

export default AuthFormInput
