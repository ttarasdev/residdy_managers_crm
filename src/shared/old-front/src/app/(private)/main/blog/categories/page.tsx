import PageTitle from '@/components/page-components/page-title/PageTitle'
import c from './BlogCatsPage.module.scss'
import BlogCategoriesBlock from '@/components/blog/blog-categories/blog-categories-block/BlogCategoriesBlock'

const BlogCategoriesPage = () => {
	return (
		<div className={c.page}>
			<PageTitle title="Zarządzanie blogiem" />
			<div className={c.page__row}>
				<BlogCategoriesBlock />
			</div>
		</div>
	)
}

export default BlogCategoriesPage
