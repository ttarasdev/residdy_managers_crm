'use client'

import {
	Partner,
	UpdatePartnerDto,
} from '@/api/partners-api/partners/partners.types'
import c from './ChangePartnerForm.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { partnersApi } from '@/api/partners-api/partners/partners.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import { isActiveSelectData } from '@/shared/constants/form-select-data'
import FormSelect from '@/components/form-components/form-select/FormSelect'
import FormFooter from '@/components/form-components/form-footer/FormFooter'

interface Props {
	itemData: Partner
	onClose: () => void
}

const ChangePartnerForm: React.FC<Props> = ({ itemData, onClose }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [companyName, setCompanyName] = useState<string | null>(
		itemData.companyName,
	)
	const [websiteUrl, setWebsiteUrl] = useState<string | null>(
		itemData.websiteUrl,
	)
	const [isActive, setIsActive] = useState<boolean>(itemData.isActive)

	const mutation = useMutation({
		mutationFn: partnersApi.update,
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [QUERY_KEYS.PARTNERS, itemData.id],
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

		if (companyName) {
			const dto: UpdatePartnerDto = {
				id: itemData.id,
				companyName,
				...(websiteUrl ? { websiteUrl } : {}),
				isActive,
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
					<FormTitle title="Zmień dane partnera" />
					<TextInput
						inputTitle="nazwa"
						value={companyName}
						onChange={setCompanyName}
					/>
					<TextInput
						inputTitle="website url"
						value={websiteUrl}
						onChange={setWebsiteUrl}
					/>
					<FormSelect
						item={isActive}
						onChange={setIsActive}
						options={isActiveSelectData}
						selectTitle="wybierz status"
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

export default ChangePartnerForm
