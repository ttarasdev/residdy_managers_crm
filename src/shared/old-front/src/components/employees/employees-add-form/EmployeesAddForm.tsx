'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import c from './EmployeesAddForm.module.scss'
import { useState } from 'react'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import FormRolesList from '@/components/form-components/form-roles-list/FormRolesList'
import { authApi } from '@/api/manager-api/auth/auth'

interface Props {
	onClose: () => void
}

const EmployeesAddForm: React.FC<Props> = ({ onClose }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [name, setName] = useState<string | null>(null)
	const [surname, setSurname] = useState<string | null>(null)
	const [email, setEmail] = useState<string | null>(null)
	const [phone, setPhone] = useState<string | null>(null)
	const [location, setLocation] = useState<string | null>(null)
	const [position, setPosition] = useState<string | null>(null)
	const [rolesIds, setRolesIds] = useState<number[]>([])

	const toggleRole = (roleId: number) => {
		setRolesIds((prev) =>
			prev.includes(roleId)
				? prev.filter((id) => id !== roleId)
				: [...prev, roleId],
		)
	}

	const mutation = useMutation({
		mutationFn: authApi.register,
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [QUERY_KEYS.MANAGERS] })
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

		if (
			name &&
			surname &&
			email &&
			phone &&
			location &&
			position &&
			rolesIds.length > 0
		) {
			const payload = {
				name: name.trim(),
				surname: surname.trim(),
				email: email.trim(),
				phone: phone.trim(),
				location: location.trim(),
				position: position.trim(),
				roles: rolesIds,
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
					<FormTitle title="Dodaj pracownika" />
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
						inputTitle="numer telefonu"
						value={phone}
						onChange={setPhone}
					/>
					<TextInput
						inputTitle="adres"
						value={location}
						onChange={setLocation}
					/>
					<TextInput
						inputTitle="pozycja"
						value={position}
						onChange={setPosition}
					/>
					<FormRolesList
						activeItems={rolesIds}
						toggleItem={toggleRole}
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

export default EmployeesAddForm
