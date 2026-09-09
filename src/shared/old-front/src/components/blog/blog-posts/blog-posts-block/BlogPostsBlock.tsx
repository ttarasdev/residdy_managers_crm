'use client'

import { mapBlogPostsToTableRows } from '@/shared/lib/dataToTableMap'
import c from './BlogPostsBlock.module.scss'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Languages } from '@/shared/types-enums/lans'
import { BlogPostStatus } from '@/api/blog-api/blog-posts/blog-posts.types'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { blogPostsApi } from '@/api/blog-api/blog-posts/blog-posts.api'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import PageBlockHeader from '@/components/page-block-components/page-block-header/PageBlockHeader'
import PageBlockTable from '@/components/page-block-components/page-block-table/PageBlockTable'
import { PAGE_PATHS } from '@/shared/types-enums/paths'
import PageBlockChangePage from '@/components/page-block-components/page-block-change-page/PageBlockChangePage'
import BlogPostsAddForm from '../blog-posts-add-form/BlogPostsAddForm'
import { BlogPostsStatusFilterData } from '@/shared/constants/new-filters-data'

const BlogPostsBlock = () => {
	const [page, setPage] = useState<number>(1)
	const [lan, setLan] = useState<Languages | null>(null)
	const [categoryId, setCategoryId] = useState<number | null>(null)
	const [isFormOpened, setIsFormOpened] = useState(false)
	const [status, setStatus] = useState<BlogPostStatus | null>(null)
	const [isPopular, setIsPopular] = useState<boolean | null>(null)
	const limit = 8

	const { data, isLoading, error } = useQuery({
		queryKey: [
			QUERY_KEYS.BLOG_POSTS,
			page,
			lan,
			status,
			categoryId,
			isPopular,
		],
		queryFn: () => {
			const params: Record<string, any> = {
				page,
				limit,
			}
			if (lan) params.lan = lan
			if (categoryId) params.categoryId = categoryId
			if (status) params.status = status
			if (isPopular) params.isPopular = isPopular
			return blogPostsApi.list(params)
		},
		placeholderData: keepPreviousData,
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

	const tableData = mapBlogPostsToTableRows(data.items)

	return (
		<div className={c.block}>
			<PageBlockHeader<BlogPostStatus>
				lan={lan}
				setLan={setLan}
				status={status}
				setStatus={setStatus as any}
				isPopular={isPopular}
				setIsPopular={setIsPopular}
				statusItems={BlogPostsStatusFilterData}
				title="Publikacje"
				openAddForm={() => setIsFormOpened(true)}
			/>
			<PageBlockTable itemPath={PAGE_PATHS.BLOG_POSTS} data={tableData} />
			<PageBlockChangePage
				page={page}
				setPage={setPage}
				maxPage={maxPage}
			/>
			{isFormOpened && (
				<BlogPostsAddForm onClose={() => setIsFormOpened(false)} />
			)}
		</div>
	)
}

export default BlogPostsBlock
