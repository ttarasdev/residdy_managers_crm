'use client'

import c from './ProfileChangeForm.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import {
	Manager,
	UpdateManagerDto,
} from '@/api/manager-api/manager/manager.types'
import { managerApi } from '@/api/manager-api/manager/manager.api'

interface Props {
	onClose: () => void
	data: Manager
}

const ProfileChangeForm: React.FC<Props> = ({ data, onClose }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [name, setName] = useState<string | null>(data.name)
	const [surname, setSurname] = useState<string | null>(data.surname)
	const [email, setEmail] = useState<string | null>(data.email)
	const [phone, setPhone] = useState<string | null>(data.phone)
	const [location, setLocation] = useState<string | null>(data.location)

	const mutation = useMutation({
		mutationFn: managerApi.updateCurrent,
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [QUERY_KEYS.MANAGER_ME],
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

	const submit = (e: React.FormEvent) => {
		e.preventDefault()
		setErrorMessage(null)

		if (name && surname && email && phone && location) {
			const dto: UpdateManagerDto = {
				name,
				surname,
				email,
				phone,
				location,
			}

			mutation.mutate(dto)
		} else {
			setErrorMessage('wypełnij wszystko')
		}
	}

	return (
		<ModalPortal>
			<div className={c.form__container}>
				<div className={c.form}>
					<FormTitle title="Zmień dane" />
					<TextInput
						inputTitle="imie"
						value={name}
						onChange={setName}
					/>
					<TextInput
						inputTitle="nazwisko"
						value={surname}
						onChange={setSurname}
					/>
					<TextInput
						inputTitle="email"
						value={email}
						onChange={setEmail}
					/>
					<TextInput
						inputTitle="numer"
						value={phone}
						onChange={setPhone}
					/>
					<TextInput
						inputTitle="adres"
						value={location}
						onChange={setLocation}
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

export default ProfileChangeForm
