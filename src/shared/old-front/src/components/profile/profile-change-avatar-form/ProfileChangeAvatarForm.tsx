'use client'

import FormFooter from '@/components/form-components/form-footer/FormFooter'
import c from './ProfileChangeAvatarForm.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import MediaFileInput from '@/components/form-components/media-file-input/MediaFileInput'
import { managerApi } from '@/api/manager-api/manager/manager.api'
import { MediaTypeEnum } from '@/shared/types-enums/media'
import { PRIVATE_BUCKETS } from '@/shared/types-enums/buckets'

interface Props {
	onClose: () => void
}

const ProfileChangeAvatarForm: React.FC<Props> = ({ onClose }) => {
	const qc = useQueryClient()

	const [file, setFile] = useState<File | null>(null)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const mutation = useMutation({
		mutationFn: managerApi.updateMyAvatar,
		onSuccess: (res: any) => {
			qc.invalidateQueries()
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

	const submit = (e: React.FormEvent) => {
		if (file) {
			e.preventDefault()
			setErrorMessage(null)
			mutation.mutate(file)
		}
	}

	return (
		<ModalPortal>
			<div className={c.form__container}>
				<div className={c.form}>
					<FormTitle title="Zmień swój avatar" />
					<MediaFileInput setFile={setFile} />
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

export default ProfileChangeAvatarForm
