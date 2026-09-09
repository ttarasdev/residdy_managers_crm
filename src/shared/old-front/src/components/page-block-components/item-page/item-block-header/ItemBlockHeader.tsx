'use client'

import { Languages } from '@/shared/types-enums/lans'
import c from './ItemBlockHeader.module.scss'

interface Props {
	status?: string
	id: number
	lan?: Languages
	isPopular?: boolean
	createdAt?: string
}

const ItemBlockHeader: React.FC<Props> = ({
	status,
	id,
	lan,
	isPopular,
	createdAt,
}) => {
	return (
		<div className={c.header}>
			<div className={c.header__items}>
				<p className={c.header__item}>
					<span>ID:</span>
					{id}
				</p>
				{createdAt && (
					<p className={c.header__item}>
						<span>data utworzenia:</span>
						{createdAt}
					</p>
				)}
			</div>
			<div className={c.header__statuses}>
				{lan && <p className={`${c.header__status} ${c.lan}`}>{lan}</p>}
				{status && (
					<p className={`${c.header__status} ${c.status}`}>
						{status}
					</p>
				)}
				{isPopular && isPopular === true && (
					<p className={`${c.header__status} ${c.isPopular}`}>
						popularny
					</p>
				)}
			</div>
		</div>
	)
}

export default ItemBlockHeader
