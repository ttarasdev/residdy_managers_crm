'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import c from './ChangePartnerPhotoForm.module.scss'
import { useState } from 'react'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import MediaFileInput from '@/components/form-components/media-file-input/MediaFileInput'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import { partnersInfoApi } from '@/api/partners-api/partners-info/partners-info.api'

interface Props {
	id: number
	onClose: () => void
}

const ChangePartnerPhotoForm: React.FC<Props> = ({ id, onClose }) => {
	const qc = useQueryClient()

	const [file, setFile] = useState<File | null>(null)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const mutation = useMutation({
		mutationFn: partnersInfoApi.updateMainPhoto,
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [QUERY_KEYS.PARTNERS, id],
			})
			setFile(null)
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

	const send = () => {
		if (file) return mutation.mutate({ id, file })
	}

	return (
		<ModalPortal>
			<div className={c.form__container}>
				<div className={c.form}>
					<FormTitle title="Zmień logo" />
					<MediaFileInput setFile={setFile} />
					{errorMessage && (
						<div className={c.form__error}>{errorMessage}</div>
					)}
					<FormFooter
						onCancel={onClose}
						onSubmit={send}
						isPending={mutation.isPending}
					/>
				</div>
			</div>
		</ModalPortal>
	)
}

export default ChangePartnerPhotoForm
