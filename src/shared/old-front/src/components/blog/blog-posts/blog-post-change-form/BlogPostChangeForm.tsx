'use client'

import {
	BlogPost,
	BlogPostStatus,
} from '@/api/blog-api/blog-posts/blog-posts.types'
import c from './BlogPostChangeForm.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Languages } from '@/shared/types-enums/lans'
import TipTapInput, {
	EMPTY_DOC,
} from '@/components/form-components/tiptap-input/TipTapInput'
import { blogPostsApi } from '@/api/blog-api/blog-posts/blog-posts.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormSelect from '@/components/form-components/form-select/FormSelect'
import {
	blogPostStatusSelectData,
	isPinnedSelectData,
	isPopularSelectData,
	lansSelectData,
} from '@/shared/constants/form-select-data'
import FormBlogCatsList from '@/components/form-components/form-blog-cats-list/FormBlogCatsList'
import FormVariantsList from '@/components/form-components/form-variants-list/FormVariantsList'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import { PRIVATE_BUCKETS } from '@/shared/types-enums/buckets'

interface Props {
	onClose: () => void
	data: BlogPost
}

const BlogPostChangeForm: React.FC<Props> = ({ data, onClose }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [title, setTitle] = useState<string | null>(data.title)
	const [variantId, setVariantId] = useState<number | null>(data.variantId)
	const [lan, setLan] = useState<Languages | null>(data.lan)
	const [isPopular, setIsPopular] = useState<boolean>(data.isPopular)
	const [isPinned, setIsPinned] = useState<boolean>(data.isPinned)
	const [status, setStatus] = useState<BlogPostStatus>(data.status)
	const [contentJson, setContentJson] = useState<Record<string, any>>(
		data.contentJson,
	)
	const [categoryIds, setCategoryIds] = useState<number[]>(
		data.categories ? data.categories.map((i) => i.id) : [],
	)

	const toggleCategoryItem = (id: number) => {
		setCategoryIds((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
		)
	}

	const mutation = useMutation({
		mutationFn: blogPostsApi.update,
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [QUERY_KEYS.BLOG_POSTS, data.id],
			})
			setErrorMessage(null)
			onClose()
		},
		onError: (error: any) => {
			const msg =
				error?.data?.message ||
				error?.message ||
				'Wystąpił błąd podczas tworzenia posta'
			setErrorMessage(msg)
		},
	})

	const submit = (e: React.FormEvent) => {
		if (title && variantId && lan && contentJson && categoryIds) {
			const payload = {
				id: data.id,
				dto: {
					title,
					variantId,
					lan,
					contentJson,
					categoryIds,
					isPinned,
					isPopular,
				},
			}

			e.preventDefault()
			setErrorMessage(null)
			mutation.mutate(payload)
		}
	}

	return (
		<ModalPortal>
			<div className={c.form__container}>
				<div className={c.form}>
					<FormTitle title="Zmień publikacje" />
					<TextInput
						inputTitle="nazwa"
						value={title}
						onChange={setTitle}
					/>
					<FormSelect
						item={lan}
						onChange={setLan}
						options={lansSelectData}
						selectTitle="wybierz język"
					/>
					<FormSelect
						item={isPinned}
						onChange={setIsPinned}
						options={isPinnedSelectData}
						selectTitle="przypnij"
					/>
					<FormSelect
						item={status}
						onChange={setStatus}
						options={blogPostStatusSelectData}
						selectTitle="status (żeby zaplanować użyj innego okna)"
					/>
					<FormSelect
						item={isPopular}
						onChange={setIsPopular}
						options={isPopularSelectData}
						selectTitle="popularny?"
					/>
					<FormBlogCatsList
						activeItems={categoryIds}
						toggleItem={toggleCategoryItem}
					/>
					<FormVariantsList
						bucket={PRIVATE_BUCKETS.BLOG_MAIN_PHOTOS}
						activeVariantId={variantId}
						chooseItem={setVariantId}
						queryKeys={[QUERY_KEYS.MEDIA_ICON_KEY]}
					/>
					<TipTapInput
						contentJson={contentJson}
						setContentJson={setContentJson}
					/>
					{errorMessage && (
						<div className={c.form__error}>{errorMessage}</div>
					)}
					<FormFooter
						onCancel={() => onClose()}
						onSubmit={submit}
						isPending={mutation.isPending}
					/>
				</div>
			</div>
		</ModalPortal>
	)
}

export default BlogPostChangeForm
