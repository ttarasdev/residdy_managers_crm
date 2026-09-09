'use client'

import { BlogCategory } from '@/api/blog-api/blog-categories/blogCategories.types'
import c from './BlogCategoryChangeForm.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { blogCategoriesApi } from '@/api/blog-api/blog-categories/blogCategories.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormFooter from '@/components/form-components/form-footer/FormFooter'

interface Props {
	data: BlogCategory
	onClose: () => void
}

const BlogCategoryChangeForm: React.FC<Props> = ({ data, onClose }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [name_ua, setNameUa] = useState<string | null>(data.name_ua)
	const [name_pl, setNamePl] = useState<string | null>(data.name_pl)
	const [name_en, setNameEn] = useState<string | null>(data.name_en)
	const [name_ru, setNameRu] = useState<string | null>(data.name_ru)

	const mutation = useMutation({
		mutationFn: blogCategoriesApi.update,
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [QUERY_KEYS.BLOG_CATEGORIES, data.id],
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

	const clean = (v: string | null) => v?.trim() || undefined

	const submit = (e: React.FormEvent) => {
		e.preventDefault()
		setErrorMessage(null)

		if ([name_ua, name_pl, name_en, name_ru].every((v) => !!v?.trim())) {
			mutation.mutate({
				id: data.id,
				dto: {
					name_ua: clean(name_ua),
					name_pl: clean(name_pl),
					name_en: clean(name_en),
					name_ru: clean(name_ru),
				},
			})
		}
	}

	return (
		<ModalPortal>
			<div className={c.form__container}>
				<div className={c.form}>
					<FormTitle title="Zmień publikacje" />
					<TextInput
						inputTitle="nazwa PL"
						value={name_pl}
						onChange={setNamePl}
					/>
					<TextInput
						inputTitle="nazwa UA"
						value={name_ua}
						onChange={setNameUa}
					/>
					<TextInput
						inputTitle="nazwa EN"
						value={name_en}
						onChange={setNameEn}
					/>
					<TextInput
						inputTitle="nazwa RU"
						value={name_ru}
						onChange={setNameRu}
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

export default BlogCategoryChangeForm
