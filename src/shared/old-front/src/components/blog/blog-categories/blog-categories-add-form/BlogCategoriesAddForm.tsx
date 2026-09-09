'use client'

import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import c from './BlogCategoriesAddForm.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { blogCategoriesApi } from '@/api/blog-api/blog-categories/blogCategories.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormFooter from '@/components/form-components/form-footer/FormFooter'

interface Props {
	onClose: () => void
}

const BlogCategoriesAddForm: React.FC<Props> = ({ onClose }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [name_ua, setNameUa] = useState<string | null>(null)
	const [name_pl, setNamePl] = useState<string | null>(null)
	const [name_en, setNameEn] = useState<string | null>(null)
	const [name_ru, setNameRu] = useState<string | null>(null)

	const mutation = useMutation({
		mutationFn: blogCategoriesApi.create,
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [QUERY_KEYS.BLOG_CATEGORIES] })
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

		if (!name_en || !name_pl || !name_ru || !name_ua) {
			setErrorMessage('wypełnij wszystko')
			return
		}

		const payload = {
			name_en,
			name_pl,
			name_ru,
			name_ua,
		}
		mutation.mutate(payload)
	}

	return (
		<ModalPortal>
			<div className={c.form__container}>
				<div className={c.form}>
					<FormTitle title="dodaj kategorię" />
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

export default BlogCategoriesAddForm
