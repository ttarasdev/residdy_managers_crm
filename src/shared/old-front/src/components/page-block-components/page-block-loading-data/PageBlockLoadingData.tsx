'use client'

import c from './PageBlockLoadingData.module.scss'

interface Props {
	width?: string | number
	height?: string | number
	borderRadius?: string | number
}

const PageBlockLoadingData: React.FC<Props> = ({
	width = '100%',
	height = '100%',
	borderRadius = '25px',
}) => {
	const style: React.CSSProperties = {
		width: typeof width === 'number' ? `${width}px` : width,
		height: typeof height === 'number' ? `${height}px` : height,
		borderRadius:
			typeof borderRadius === 'number'
				? `${borderRadius}px`
				: borderRadius,
	}

	return (
		<div className={c.skeleton} style={style}>
			<div className={c.shimmer} />
		</div>
	)
}

export default PageBlockLoadingData
