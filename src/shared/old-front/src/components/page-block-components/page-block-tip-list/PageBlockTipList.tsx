'use client'

import { Tip } from '@/shared/types-enums/tip'
import c from './PageBlockTipList.module.scss'
import PageBlockTip from '../page-block-tip/PageBlockTip'

interface Props {
	tips: Tip[]
}

const PageBlockTipList: React.FC<Props> = ({ tips }) => {
	return (
		<div className={c.tips}>
			{tips.map((i) => (
				<PageBlockTip key={i.id} tip={i} />
			))}
		</div>
	)
}

export default PageBlockTipList
