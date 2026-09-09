'use client'

import { useState } from 'react'
import c from './IconAddForm.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import MediaFileInput from '@/components/form-components/media-file-input/MediaFileInput'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { publicAssetsApi } from '@/api/media/public-assets/public-assets.api'
import { PublicAsset } from '@/api/media/public-assets/public-assets.types'
import { PUBLIC_BUCKETS } from '@/shared/types-enums/buckets'

interface Props {
	onClose: () => void
}

const IconAddForm: React.FC<Props> = ({ onClose }) => {
	const qc = useQueryClient()

	const [file, setFile] = useState<File | null>(null)
	const [originalName, setOriginalName] = useState<string | null>(null)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const mutation = useMutation<PublicAsset>({
		mutationFn: async () => {
			if (!file) throw new Error('File missing')

			return publicAssetsApi.create(file, {
				bucket: PUBLIC_BUCKETS.ICONS,
				originalName: originalName || file.name,
			})
		},
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [QUERY_KEYS.MEDIA_ICON_KEY],
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
					<FormTitle title="Dodaj public asset" />
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

export default IconAddForm
