'use client'

import { useState } from 'react'
import c from './BlogPostBlock.module.scss'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { blogPostsApi } from '@/api/blog-api/blog-posts/blog-posts.api'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import ItemBlockTop from '@/components/page-block-components/item-page/item-block-top/ItemBlockTop'
import ItemBlockHeader from '@/components/page-block-components/item-page/item-block-header/ItemBlockHeader'
import { formatDate } from '@/shared/lib/date'
import BlogPostChangeForm from '../blog-post-change-form/BlogPostChangeForm'
import TipTapContentRenderer from '@/components/features-components/tiptup-content-renderer/TipTapContentRenderer'
import { ConfirmationModal } from '@/components/features-components/confirmation-modal/ConfirmationModal'
import { useRouter } from 'next/navigation'
import { PAGE_PATHS } from '@/shared/types-enums/paths'
import { useConfirm } from '@/shared/hooks/useConfirm'
import { BlogPostStatus } from '@/api/blog-api/blog-posts/blog-posts.types'
import BlogPostScheduleForm from '../blog-post-schedule-form/BlogPostScheduleForm'

interface Props {
	id: number
}

const BlogPostBlock: React.FC<Props> = ({ id }) => {
	const [isChangeFormOpened, setIsChangeFormOpened] = useState(false)
	const [isScheduleFormOpened, setIsScheduleFormOpened] = useState(false)

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.BLOG_POSTS, id],
		queryFn: () => blogPostsApi.getById(id),
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

	return (
		<div className={c.block}>
			<ItemBlockTop
				title={data.title}
				subtitle={data.lan}
				variantId={data.variantId}
				secondButtonTitle="zaplanuj"
				setIsSecondFormOpened={() => setIsScheduleFormOpened(true)}
				setIsFormOpened={() => setIsChangeFormOpened(true)}
			/>
			<ItemBlockHeader
				id={data.id}
				lan={data.lan}
				status={data.status.toString()}
				isPopular={data.isPopular}
				createdAt={formatDate(data.createdAt)}
			/>
			<div className={c.block__row}>
				<TipTapContentRenderer contentJson={data.contentJson} />
			</div>
			{isChangeFormOpened && (
				<BlogPostChangeForm
					data={data}
					onClose={() => setIsChangeFormOpened(false)}
				/>
			)}
			{isScheduleFormOpened &&
				data.status !== BlogPostStatus.PUBLISHED && (
					<BlogPostScheduleForm
						id={id}
						onClose={() => setIsScheduleFormOpened(false)}
					/>
				)}
		</div>
	)
}

export default BlogPostBlock
