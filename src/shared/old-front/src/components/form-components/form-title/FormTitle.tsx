'use client'

import c from './FormTitle.module.scss'

interface Props {
	title: string
}

const FormTitle: React.FC<Props> = ({ title }) => {
	return <p className={c.title}>{title}</p>
}

export default FormTitle
