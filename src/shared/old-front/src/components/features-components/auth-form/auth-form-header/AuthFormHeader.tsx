'use client'

import c from './AuthFormHeader.module.scss'

interface Props {
	title: string
	subtitle: string | null
}

const AuthFormHeader: React.FC<Props> = ({ title, subtitle }) => {
	return (
		<div className={c.header}>
			<h1 className={c.header__title}>{title}</h1>
			{subtitle && <h2 className={c.header__subtitle}>{subtitle}</h2>}
		</div>
	)
}

export default AuthFormHeader
