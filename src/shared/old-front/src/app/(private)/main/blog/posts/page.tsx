import c from './BlogPostsPage.module.scss'
import PageTitle from '@/components/page-components/page-title/PageTitle'
import BlogPostsBlock from '@/components/blog/blog-posts/blog-posts-block/BlogPostsBlock'
import PageBlockTipList from '@/components/page-block-components/page-block-tip-list/PageBlockTipList'
import { casesBlockTipList } from '@/shared/constants/tips-data'

const BlogPostsPage = () => {
	return (
		<div className={c.page}>
			<PageTitle title="Zarządzanie blogiem" />
			<div className={c.page__row}>
				<BlogPostsBlock />
				<PageBlockTipList tips={casesBlockTipList} />
			</div>
		</div>
	)
}

export default BlogPostsPage
