'use client'

import {
	isPopularFilterData,
	lansFilterData,
} from '@/shared/constants/new-filters-data'
import c from './PageBlockHeader.module.scss'
import PageBlockHeaderFilter from '../page-block-header-filter/PageBlockHeaderFilter'
import { ThemedIcon } from '@/components/features-components/theme-icon/ThemedIcon'
import { Languages } from '@/shared/types-enums/lans'

interface Props<TStatus> {
	openAddForm?: () => void
	lan?: Languages | null
	setLan?: (lan: Languages | null) => void
	isPopular?: boolean | null
	setIsPopular?: (isPopular: boolean | null) => void
	status?: TStatus | null
	setStatus?: (status: TStatus | null) => void
	statusItems?: { title: string; value: TStatus | null }[]
	title: string
}

const PageBlockHeader = <TStatus,>({
	openAddForm,
	setLan,
	setIsPopular,
	setStatus,
	statusItems,
	title,
}: Props<TStatus>) => {
	return (
		<div className={c.header}>
			<p className={c.header__title}>{title}</p>
			<div className={c.header__filters}>
				{setLan && (
					<PageBlockHeaderFilter
						items={lansFilterData}
						setItem={setLan}
						iconPath="/page_header/lan"
					/>
				)}
				{setIsPopular && (
					<PageBlockHeaderFilter
						items={isPopularFilterData}
						setItem={setIsPopular}
						iconPath="/page_header/popular"
					/>
				)}
				{setStatus && statusItems && (
					<PageBlockHeaderFilter
						items={statusItems}
						setItem={setStatus}
						iconPath="/page_header/status"
					/>
				)}
				{openAddForm && (
					<button onClick={openAddForm} className={c.header__add}>
						<ThemedIcon path="/page_header/plus" />
					</button>
				)}
			</div>
		</div>
	)
}

export default PageBlockHeader
