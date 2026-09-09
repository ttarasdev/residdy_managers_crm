'use client'

import c from './PageTitle.module.scss'

interface Props {
	title: string
}

const PageTitle: React.FC<Props> = ({ title }) => {
	return <h1 className={c.title}>{title}</h1>
}

export default PageTitle
