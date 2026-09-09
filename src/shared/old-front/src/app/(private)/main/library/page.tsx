'use client'

import PageTitle from '@/components/page-components/page-title/PageTitle'
import c from './Library.module.scss'
import IconLibraryBlock from '@/components/library/icon-library-block/IconLibraryBlock'

const Library = () => {
	return (
		<div className={c.page}>
			<PageTitle title="Biblioteka ikonek" />
			<div className={c.page__row}>
				<IconLibraryBlock />
			</div>
		</div>
	)
}

export default Library
