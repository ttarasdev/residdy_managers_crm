'use client'

import { BlogCategory } from '@/api/blog-api/blog-categories/blogCategories.types'
import c from './BlogCategoriesSubBlock.module.scss'
import SubBlockHeader from '@/components/page-block-components/item-page/sub-block/sub-block-header/SubBlockHeader'
import SubBlockItem from '@/components/page-block-components/item-page/sub-block/sub-block-item/SubBlockItem'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { caseStageApi } from '@/api/cases-api/case-stages/case-stages.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { blogCategoriesApi } from '@/api/blog-api/blog-categories/blogCategories.api'

interface Props {
	data: BlogCategory[]
	activeId: number
}

const BlogCategoriesSubBlock: React.FC<Props> = ({ data, activeId }) => {
	const qc = useQueryClient()

	const reorderMutation = useMutation({
		mutationFn: blogCategoriesApi.reorder,
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [QUERY_KEYS.BLOG_CATEGORIES],
			})
		},
	})

	return (
		<div className={c.block}>
			<SubBlockHeader
				title="wszystkie kategorie"
				iconPath="/block_icons/stages.png"
			/>
			<div className={c.block__items}>
				{data.map((i) => (
					<SubBlockItem
						key={i.id}
						itemId={i.id}
						title={i.name_pl}
						subtitle={i.name_ua}
						activeItemId={activeId}
						setActiveItemId={() => {}}
						toggleDown={(id: number) => {
							reorderMutation.mutate({
								id,
								direction: 'down',
							})
						}}
						toggleUp={(id: number) => {
							reorderMutation.mutate({
								id,
								direction: 'up',
							})
						}}
					/>
				))}
			</div>
		</div>
	)
}

export default BlogCategoriesSubBlock
