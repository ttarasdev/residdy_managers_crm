'use client'

import { useState } from 'react'
import c from './BlogCategoriesBlock.module.scss'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { blogCategoriesApi } from '@/api/blog-api/blog-categories/blogCategories.api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import { mapBlogCategoriesToTableRows } from '@/shared/lib/dataToTableMap'
import PageBlockHeader from '@/components/page-block-components/page-block-header/PageBlockHeader'
import { PAGE_PATHS } from '@/shared/types-enums/paths'
import PageBlockTable from '@/components/page-block-components/page-block-table/PageBlockTable'
import PageBlockChangePage from '@/components/page-block-components/page-block-change-page/PageBlockChangePage'
import BlogCategoriesAddForm from '../blog-categories-add-form/BlogCategoriesAddForm'

const BlogCategoriesBlock = () => {
	const [isFormOpened, setIsFormOpened] = useState(false)
	const [page, setPage] = useState(1)

	const limit = 8
	const offset = (page - 1) * limit

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.BLOG_CATEGORIES, page],
		queryFn: () => blogCategoriesApi.list({ limit, offset }),
		placeholderData: keepPreviousData,
		staleTime: 60_000,
	})

	if (isLoading)
		return (
			<div className={c.block}>
				<PageBlockLoadingData />
			</div>
		)
	if (error || !data)
		return (
			<div className={c.block}>
				<PageBlockNoData />
			</div>
		)

	const maxPage = Math.ceil(data.total / limit)

	const tableData = mapBlogCategoriesToTableRows(data.items)

	return (
		<div className={c.block}>
			<PageBlockHeader
				title="kategorie bloga"
				openAddForm={() => setIsFormOpened(true)}
			/>
			<PageBlockTable
				itemPath={PAGE_PATHS.BLOG_CATEGORIES}
				data={tableData}
			/>
			<PageBlockChangePage
				page={page}
				setPage={setPage}
				maxPage={maxPage}
			/>
			{isFormOpened && (
				<BlogCategoriesAddForm onClose={() => setIsFormOpened(false)} />
			)}
		</div>
	)
}

export default BlogCategoriesBlock
