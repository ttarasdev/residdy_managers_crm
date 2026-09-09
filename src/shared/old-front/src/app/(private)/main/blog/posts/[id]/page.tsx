'use client'

import { usePathname } from 'next/navigation'
import c from './BlogPostPage.module.scss'
import PageBlockTipList from '@/components/page-block-components/page-block-tip-list/PageBlockTipList'
import { casesBlockTipList } from '@/shared/constants/tips-data'
import BlogPostBlock from '@/components/blog/blog-posts/blog-post-block/BlogPostBlock'

const BlogPostPage = () => {
	const pathname = usePathname()
	const id = Number(pathname.split('/').at(-1))

	return (
		<div className={c.page}>
			<div className={c.page__row}>
				<BlogPostBlock id={id} />
				<PageBlockTipList tips={casesBlockTipList} />
			</div>
		</div>
	)
}

export default BlogPostPage
