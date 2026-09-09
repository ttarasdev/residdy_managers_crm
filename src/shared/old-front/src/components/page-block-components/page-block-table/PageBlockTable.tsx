'use client'

import { PAGE_PATHS } from '@/shared/types-enums/paths'
import c from './PageBlockTable.module.scss'
import { TableRow } from '@/shared/types-enums/table'
import Image from 'next/image'
import PageBlockNoData from '../page-block-no-data/PageBlockNoData'
import { useRouter } from 'next/navigation'
import { IconContainer } from '@/components/library/icon-container/IconContainer'

type StatusLike = string

interface Props<TStatus extends StatusLike> {
	itemPath?: string
	toggleItem?: (id: number) => void
	data: TableRow<TStatus>[]
}

const PageBlockTable = <TStatus extends string>({
	data,
	itemPath,
	toggleItem,
}: Props<TStatus>) => {
	const router = useRouter()

	if (!Array.isArray(data) || data.length === 0)
		return (
			<div className={c.table}>
				<PageBlockNoData
					title="Brak wyników"
					subtitle="Nie znaleźliśmy elementów pasujących do Twoich filtrów."
				/>
			</div>
		)

	const changePath = (id: number) => {
		router.push(itemPath + '/' + id)
	}

	return (
		<div className={c.table}>
			<div className={c.header}>
				{'iconId' in data[0] && (
					<p className={`${c.header__item} ${c.icon}`}></p>
				)}
				{'title' in data[0] && (
					<p className={`${c.header__item} ${c.title}`}>nazwa</p>
				)}

				{'status' in data[0] && (
					<p className={`${c.header__item} ${c.status}`}>status</p>
				)}

				{'lan' in data[0] && (
					<p className={`${c.header__item} ${c.lan}`}>język</p>
				)}

				{'isPopular' in data[0] && (
					<p className={`${c.header__item} ${c.isPopular}`}>
						popularny
					</p>
				)}
				{'version' in data[0] && (
					<p className={`${c.header__item} ${c.version}`}>wersja</p>
				)}
			</div>
			<div className={c.table__rows}>
				{data.map((i) => (
					<div
						key={i.id}
						className={c.row}
						onClick={
							toggleItem
								? () => toggleItem(i.id)
								: itemPath
								? () => changePath(i.id)
								: () => {}
						}
					>
						{'icon' in data[0] && (
							<div className={`${c.row__item} ${c.img}`}>
								<div className={c.row__image}>
									{i.icon && <IconContainer item={i.icon} />}
								</div>
							</div>
						)}
						{'title' in data[0] && (
							<p className={`${c.row__item} ${c.title}`}>
								{i.title}
							</p>
						)}
						{'status' in data[0] && (
							<div className={`${c.row__item} ${c.status}`}>
								<span
									className={
										i.status == 'active'
											? c.active
											: i.status == 'draft'
											? c.draft
											: c.archived
									}
								>
									{i.status}
								</span>
							</div>
						)}
						{'lan' in data[0] && (
							<p className={`${c.row__item} ${c.lan}`}>{i.lan}</p>
						)}
						{'isPopular' in data[0] && (
							<div className={`${c.row__item} ${c.isPopular}`}>
								{i.isPopular && (
									<Image
										src={'/block_icons/like_red.svg'}
										alt="😄"
										width={20}
										height={20}
									/>
								)}
							</div>
						)}
						{'version' in data[0] && (
							<p className={`${c.row__item} ${c.version}`}>
								{i.version}
							</p>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default PageBlockTable
