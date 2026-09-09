'use client'

import { ThemedIcon } from '@/components/features-components/theme-icon/ThemedIcon'
import c from './PageBlockChangePage.module.scss'

interface Props {
	page: number
	setPage: (page: number) => void
	maxPage: number
}

const PageBlockChangePage: React.FC<Props> = ({ page, setPage, maxPage }) => {
	return (
		<div className={c.buttons}>
			<button
				className={c.buttons__left}
				disabled={page <= 1}
				onClick={() => setPage(Math.max(1, page - 1))}
				style={{
					opacity: page <= 1 ? '0.5' : '1',
				}}
			>
				<ThemedIcon path="/block_icons/arrow" />
			</button>
			<p className={c.buttons__page}>{page}</p>
			<button
				className={c.buttons__right}
				disabled={page >= maxPage}
				onClick={() => setPage(Math.min(maxPage, page + 1))}
				style={{
					opacity: page >= maxPage ? '0.5' : '1',
				}}
			>
				<ThemedIcon path="/block_icons/arrow" />
			</button>
		</div>
	)
}

export default PageBlockChangePage
