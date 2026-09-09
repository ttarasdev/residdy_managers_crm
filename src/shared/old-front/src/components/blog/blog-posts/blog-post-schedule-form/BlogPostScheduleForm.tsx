'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { blogPostsApi } from '@/api/blog-api/blog-posts/blog-posts.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import c from './BlogPostScheduleForm.module.scss'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import FormChooseDate from '@/components/form-components/form-choose-date/FormChooseDate'
import FormFooter from '@/components/form-components/form-footer/FormFooter'

interface Props {
	onClose: () => void
	id: number
}

const BlogPostScheduleForm: React.FC<Props> = ({ onClose, id }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [scheduledAt, setScheduledAt] = useState<string | null>(null)

	const mutation = useMutation({
		mutationFn: blogPostsApi.schedule,
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [QUERY_KEYS.BLOG_POSTS, id] })
			setErrorMessage(null)
			onClose()
		},
		onError: (error: any) => {
			const msg =
				error?.data?.message ||
				error?.message ||
				'Wystąpił błąd podczas tworzenia'
			setErrorMessage(msg)
		},
	})

	const submit = (e: React.FormEvent) => {
		e.preventDefault()
		setErrorMessage(null)

		if (scheduledAt) {
			const payload = {
				id,
				scheduledAt,
			}

			return mutation.mutate(payload)
		} else {
			setErrorMessage('wypełnij wszystko')
		}
	}

	return (
		<ModalPortal>
			<div className={c.form__container}>
				<div className={c.form}>
					<FormTitle title="Zaplanuj" />
					<FormChooseDate
						inputTitle="wybierz datę"
						value={scheduledAt}
						onChange={setScheduledAt}
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

export default BlogPostScheduleForm
