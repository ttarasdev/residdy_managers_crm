'use client'

import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import c from './AddPartnerForm.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Partner } from '@/api/partners-api/partners/partners.types'
import { partnersApi } from '@/api/partners-api/partners/partners.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import MediaFileInput from '@/components/form-components/media-file-input/MediaFileInput'
import FormFooter from '@/components/form-components/form-footer/FormFooter'

interface Props {
	onClose: () => void
}

const AddPartnerForm: React.FC<Props> = ({ onClose }) => {
	const qc = useQueryClient()

	const [file, setFile] = useState<File | null>(null)
	const [companyName, setCompanyName] = useState<string | null>(null)
	const [websiteUrl, setWebsiteUrl] = useState<string | null>(null)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const mutation = useMutation({
		mutationFn: partnersApi.create,
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [QUERY_KEYS.PARTNERS],
			})
			setFile(null)
			setCompanyName(null)
			setWebsiteUrl(null)
			setErrorMessage(null)
			onClose()
		},
		onError: (error: any) => {
			console.error('Upload error:', error)
			const msg =
				error?.data?.message ||
				error?.message ||
				'Wystąpił błąd podczas wysyłania pliku'
			setErrorMessage(msg)
		},
	})

	const submit = (e: React.FormEvent) => {
		if (!companyName || !file) {
			setErrorMessage('wypełnij wszystko')
			return
		}
		e.preventDefault()
		setErrorMessage(null)
		mutation.mutate({
			dto: {
				companyName,
				...(websiteUrl ? { websiteUrl } : {}),
			},
			file,
		})
	}

	return (
		<ModalPortal>
			<div className={c.form__container}>
				<div className={c.form}>
					<FormTitle title="Dodaj partnera" />
					<TextInput
						inputTitle="nazwa"
						value={companyName}
						onChange={setCompanyName}
					/>
					<MediaFileInput setFile={setFile} />
					{errorMessage && (
						<div className={c.form__error}>{errorMessage}</div>
					)}
					<FormFooter
						onCancel={onClose}
						onSubmit={submit}
						isPending={mutation.isPending}
					/>
				</div>
			</div>
		</ModalPortal>
	)
}

export default AddPartnerForm
