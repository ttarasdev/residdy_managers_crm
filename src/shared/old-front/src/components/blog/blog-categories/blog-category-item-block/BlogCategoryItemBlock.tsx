'use client'

import { useState } from 'react'
import c from './BlogCategoryItemBlock.module.scss'
import { useConfirm } from '@/shared/hooks/useConfirm'
import { useRouter } from 'next/navigation'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { blogCategoriesApi } from '@/api/blog-api/blog-categories/blogCategories.api'
import { PAGE_PATHS } from '@/shared/types-enums/paths'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import ItemBlockTop from '@/components/page-block-components/item-page/item-block-top/ItemBlockTop'
import { formatDate } from '@/shared/lib/date'
import ItemBlockHeader from '@/components/page-block-components/item-page/item-block-header/ItemBlockHeader'
import { ConfirmationModal } from '@/components/features-components/confirmation-modal/ConfirmationModal'
import BlogCategoryChangeForm from '../blog-category-change-form/BlogCategoryChangeForm'
import BlogCategoriesSubBlock from '../blog-categories-sub-block/BlogCategoriesSubBlock'

interface Props {
	id: number
}

const BlogCategoryItemBlock: React.FC<Props> = ({ id }) => {
	const [isChangeFormOpened, setIsChangeFormOpened] = useState(false)
	const { isOpen, open, confirm, close, isPending } = useConfirm<number>()
	const router = useRouter()

	const deleteItem = () => {
		open({
			payload: id,
			run: blogCategoriesApi.remove,
			onSuccess: () => router.push(PAGE_PATHS.BLOG),
		})
	}

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.BLOG_CATEGORIES],
		queryFn: () => blogCategoriesApi.list({}),
		placeholderData: keepPreviousData,
		staleTime: 60_000,
	})

	if (isLoading)
		return (
			<div className={c.block}>
				<PageBlockLoadingData />
			</div>
		)
	if (error || !data || data.items.length === 0)
		return (
			<div className={c.block}>
				<PageBlockNoData />
			</div>
		)

	const activeItem = data.items.filter((i) => i.id === id)[0] || null

	return (
		<div className={c.block}>
			<ItemBlockTop
				title={activeItem.name_pl}
				subtitle={formatDate(activeItem.createdAt)}
				secondButtonTitle="usuń"
				secondButtonIcon="/system_icons/delete"
				setIsSecondFormOpened={deleteItem}
				setIsFormOpened={() => setIsChangeFormOpened(true)}
			/>
			<ItemBlockHeader
				id={activeItem.id}
				status={'active'}
				createdAt={formatDate(activeItem.createdAt)}
			/>
			<div className={c.block__row}>
				<BlogCategoriesSubBlock
					data={data.items}
					activeId={activeItem.id}
				/>
			</div>
			{isChangeFormOpened && (
				<BlogCategoryChangeForm
					data={activeItem}
					onClose={() => setIsChangeFormOpened(false)}
				/>
			)}
			<ConfirmationModal
				open={isOpen}
				title="Usuwanie"
				message="Czy na pewno chcesz usunąć tą publikację?"
				confirmText="Usuń"
				cancelText="Anuluj"
				onCancel={close}
				onConfirm={confirm}
				isPending={isPending}
			/>
		</div>
	)
}

export default BlogCategoryItemBlock
