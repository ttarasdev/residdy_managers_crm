import BlogPostsBlock from '@/components/blog/blog-posts/blog-posts-block/BlogPostsBlock'
import PageTitle from '@/components/page-components/page-title/PageTitle'
import c from './BlogPage.module.scss'
import PageBlockTipList from '@/components/page-block-components/page-block-tip-list/PageBlockTipList'
import { casesBlockTipList } from '@/shared/constants/tips-data'
import BlogCategoriesBlock from '@/components/blog/blog-categories/blog-categories-block/BlogCategoriesBlock'

const BlogPage = () => {
	return (
		<div className={c.page}>
			<PageTitle title="Zarządzanie blogiem" />
			<div className={c.page__row}>
				<BlogPostsBlock />
				<PageBlockTipList tips={casesBlockTipList} />
			</div>
			<div className={c.page__row}>
				<BlogCategoriesBlock />
			</div>
		</div>
	)
}

export default BlogPage
