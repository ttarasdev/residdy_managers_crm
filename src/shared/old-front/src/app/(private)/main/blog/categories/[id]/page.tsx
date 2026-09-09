'use client'

import { usePathname } from 'next/navigation'
import c from './BlogCategoryPage.module.scss'
import BlogCategoryItemBlock from '@/components/blog/blog-categories/blog-category-item-block/BlogCategoryItemBlock'

const BlogCategoryItemPage = () => {
	const pathname = usePathname()
	const id = Number(pathname.split('/').at(-1))

	return (
		<div className={c.page}>
			<div className={c.page__row}>
				<BlogCategoryItemBlock id={id} />
			</div>
		</div>
	)
}
export default BlogCategoryItemPage
