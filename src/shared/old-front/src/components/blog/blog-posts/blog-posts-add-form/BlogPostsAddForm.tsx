'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import c from './BlogPostsAddForm.module.scss'
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
import {
	isPinnedSelectData,
	isPopularSelectData,
	lansSelectData,
} from '@/shared/constants/form-select-data'
import FormSelect from '@/components/form-components/form-select/FormSelect'
import FormVariantsList from '@/components/form-components/form-variants-list/FormVariantsList'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import FormBlogCatsList from '@/components/form-components/form-blog-cats-list/FormBlogCatsList'
import { PRIVATE_BUCKETS } from '@/shared/types-enums/buckets'

interface Props {
	onClose: () => void
}

const BlogPostsAddForm: React.FC<Props> = ({ onClose }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [title, setTitle] = useState<string | null>(null)
	const [variantId, setVariantId] = useState<number | null>(null)
	const [lan, setLan] = useState<Languages | null>(null)
	const [isPopular, setIsPopular] = useState<boolean | null>(null)
	const [isPinned, setIsPinned] = useState<boolean | null>(null)
	const [contentJson, setContentJson] =
		useState<Record<string, any>>(EMPTY_DOC)
	const [categoryIds, setCategoryIds] = useState<number[]>([])

	const toggleCategoryItem = (id: number) => {
		setCategoryIds((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
		)
	}

	const mutation = useMutation({
		mutationFn: blogPostsApi.create,
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [QUERY_KEYS.BLOG_POSTS] })
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
		e.preventDefault()
		setErrorMessage(null)

		if (!title || !variantId || !lan || !contentJson) {
			setErrorMessage('zaznacz wszystko!')
			return
		}
		const payload = {
			title: title.trim(),
			variantId,
			lan,
			contentJson,
			isPinned: isPinned ? isPinned : false,
			isPopular: isPopular ? isPopular : false,
			categoryIds,
		}
		mutation.mutate(payload)
	}

	return (
		<ModalPortal>
			<div className={c.form__container}>
				<div className={c.form}>
					<FormTitle title="Dodaj publikacje" />
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

export default BlogPostsAddForm
