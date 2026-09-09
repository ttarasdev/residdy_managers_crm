'use client'

import c from './ItemBlockText.module.scss'

interface Props {
	text: string
}

const ItemBlockText: React.FC<Props> = ({ text }) => {
	return <div className={c.block}>{text}</div>
}

export default ItemBlockText
