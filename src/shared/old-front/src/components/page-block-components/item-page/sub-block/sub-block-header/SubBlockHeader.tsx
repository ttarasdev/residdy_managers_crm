'use client'

import { ThemedIcon } from '@/components/features-components/theme-icon/ThemedIcon'
import c from './SubBlockHeader.module.scss'
import Image from 'next/image'

interface Props {
	setIsFormOpened?: () => void
	iconPath: string
	title: string
	addButtonTitle?: string
}

const SubBlockHeader: React.FC<Props> = ({
	setIsFormOpened,
	title,
	iconPath,
	addButtonTitle,
}) => {
	return (
		<div className={c.header}>
			<Image width={35} height={35} src={iconPath} alt="icon" />
			<p className={c.header__title}>{title}</p>
			{setIsFormOpened && addButtonTitle && (
				<button onClick={setIsFormOpened} className={c.header__add}>
					<ThemedIcon path="/page_header/plus" />
					<span>{addButtonTitle}</span>
				</button>
			)}
		</div>
	)
}

export default SubBlockHeader
