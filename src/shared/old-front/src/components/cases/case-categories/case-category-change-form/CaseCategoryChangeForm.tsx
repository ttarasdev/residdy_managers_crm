'use client'

import {
	CaseType,
	CaseTypeStatus,
	UpdateCaseTypeRequest,
} from '@/api/cases-api/cases-types/case-types.types'
import c from './CaseCategoryChangeForm.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { caseTypesApi } from '@/api/cases-api/cases-types/case-types.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormSelect from '@/components/form-components/form-select/FormSelect'
import {
	caseStatusSelectData,
	isPopularSelectData,
} from '@/shared/constants/form-select-data'
import FormIconsList from '@/components/form-components/form-icons-list/FormIconsList'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import { PUBLIC_BUCKETS } from '@/shared/types-enums/buckets'

interface Props {
	data: CaseType
	onClose: () => void
}

const CaseCategoryChangeForm: React.FC<Props> = ({ data, onClose }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [title, setTitle] = useState<string | null>(data.title)
	const [iconId, setIconId] = useState<number | null>(data.iconId)
	const [status, setStatus] = useState<CaseTypeStatus>(
		data.status as CaseTypeStatus,
	)
	const [isPopular, setIsPopular] = useState<boolean>(data.isPopular)

	const mutation = useMutation({
		mutationFn: caseTypesApi.update,
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [QUERY_KEYS.CASE_TYPES_KEY, data.id],
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

		if (title && status && iconId) {
			const dto: UpdateCaseTypeRequest = {
				id: data.id,
				dto: {
					title,
					iconId,
					status,
					isPopular,
				},
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
					<FormTitle title="Zmień sprawę" />
					<TextInput
						inputTitle="nazwa"
						value={title}
						onChange={setTitle}
					/>
					<FormSelect
						item={status}
						onChange={setStatus}
						options={caseStatusSelectData}
						selectTitle="wybierz status"
					/>
					<FormSelect
						item={isPopular}
						onChange={setIsPopular}
						options={isPopularSelectData}
						selectTitle="popularność"
					/>
					<FormIconsList
						bucket={PUBLIC_BUCKETS.ICONS}
						activeIconId={iconId}
						chooseItem={setIconId}
						queryKeys={[QUERY_KEYS.MEDIA_ICON_KEY]}
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

export default CaseCategoryChangeForm
