'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import c from './SpecialistAddForm.module.scss'
import { useState } from 'react'
import { specialistsApi } from '@/api/specialists/specialists/specialists.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormFooter from '@/components/form-components/form-footer/FormFooter'

interface Props {
	onClose: () => void
}

const SpecialistAddForm: React.FC<Props> = ({ onClose }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [email, setEmail] = useState<string | null>(null)

	const mutation = useMutation({
		mutationFn: specialistsApi.create,
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [QUERY_KEYS.SPECIALISTS] })
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

		if (email) {
			const payload = {
				email: email.trim(),
			}
			mutation.mutate(payload)
		} else {
			setErrorMessage('wypełnij wszystko')
		}
	}

	return (
		<ModalPortal>
			<div className={c.form__container}>
				<div className={c.form}>
					<FormTitle title="Dodaj partnera" />
					<TextInput
						inputTitle="email"
						value={email}
						onChange={setEmail}
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

export default SpecialistAddForm
