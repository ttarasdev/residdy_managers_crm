'use client'

import c from './EmployeesUpdateForm.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormRolesList from '@/components/form-components/form-roles-list/FormRolesList'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import { Manager } from '@/api/manager-api/manager/manager.types'
import { managerApi } from '@/api/manager-api/manager/manager.api'

interface Props {
	onClose: () => void
	data: Manager
}

const EmployeesUpdateForm: React.FC<Props> = ({ data, onClose }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [name, setName] = useState<string | null>(data.name)
	const [surname, setSurname] = useState<string | null>(data.surname)
	const [email, setEmail] = useState<string | null>(data.email)
	const [phone, setPhone] = useState<string | null>(data.phone)
	const [location, setLocation] = useState<string | null>(data.location)
	const [position, setPosition] = useState<string | null>(data.position)
	const [rolesIds, setRolesIds] = useState<number[]>(
		data.roles.map((i) => i.id),
	)

	const toggleRole = (roleId: number) => {
		setRolesIds((prev) =>
			prev.includes(roleId)
				? prev.filter((id) => id !== roleId)
				: [...prev, roleId],
		)
	}

	const mutation = useMutation({
		mutationFn: managerApi.updateByAdmin,
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
				id: data.id,
				dto: {
					name: name.trim(),
					surname: surname.trim(),
					email: email.trim(),
					phone: phone.trim(),
					location: location.trim(),
					position: position.trim(),
					roles: rolesIds,
				},
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

export default EmployeesUpdateForm
