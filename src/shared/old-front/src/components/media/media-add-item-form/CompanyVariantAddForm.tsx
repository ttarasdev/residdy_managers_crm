'use client'

import { useState } from 'react'
import c from './MediaAddItemForm.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import MediaFileInput from '@/components/form-components/media-file-input/MediaFileInput'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { companyVariantsApi } from '@/api/media/company-variants/company-variants.api'
import { CompanyVariantJoined } from '@/api/media/company-variants/company-variants.types'
import { PRIVATE_BUCKETS } from '@/shared/types-enums/buckets'

interface Props {
	bucket: PRIVATE_BUCKETS
	onClose: () => void
}

const CompanyVariantAddForm: React.FC<Props> = ({ bucket, onClose }) => {
	const qc = useQueryClient()

	const [file, setFile] = useState<File | null>(null)
	const [originalName, setOriginalName] = useState<string | null>(null)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const mutation = useMutation<CompanyVariantJoined>({
		mutationFn: async () => {
			if (!file) throw new Error('File missing')

			return companyVariantsApi.create(file, {
				bucket,
				originalName: originalName || file.name,
			})
		},
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [QUERY_KEYS.MEDIA_VARIANTS_KEY, bucket],
			})
			setFile(null)
			setOriginalName('')
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
		e.preventDefault()
		setErrorMessage(null)
		mutation.mutate()
	}

	return (
		<ModalPortal>
			<div className={c.form__container}>
				<div className={c.form}>
					<FormTitle title="Dodaj company variant" />
					<TextInput
						inputTitle="nazwa"
						value={originalName}
						onChange={setOriginalName}
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

export default CompanyVariantAddForm
