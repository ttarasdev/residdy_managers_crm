'use client'

import {
	CaseStatus,
	CaseWithStages,
	UpdateCaseDto,
} from '@/api/cases-api/cases/cases.type'
import c from './CaseChangeForm.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { casesApi } from '@/api/cases-api/cases/cases.api'
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
import FormCaseTypesList from '@/components/form-components/form-case-types-list/FormCaseTypesList'
import { PUBLIC_BUCKETS } from '@/shared/types-enums/buckets'

interface Props {
	itemData: CaseWithStages
	onClose: () => void
}

const CaseChangeForm: React.FC<Props> = ({ itemData, onClose }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [title, setTitle] = useState<string | null>(itemData.title)
	const [typeId, setTypeId] = useState<number | null>(itemData.typeId)
	const [subtitle, setSubtitle] = useState<string | null>(itemData.subtitle)
	const [iconId, setIconId] = useState<number | null>(itemData.iconId)
	const [status, setStatus] = useState<CaseStatus>(
		itemData.status as CaseStatus,
	)
	const [isPopular, setIsPopular] = useState<boolean>(itemData.isPopular)

	const mutation = useMutation({
		mutationFn: casesApi.update,
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [QUERY_KEYS.CASES_KEY, itemData.id],
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

		if (title && subtitle && iconId && typeId) {
			const dto: UpdateCaseDto = {
				id: itemData.id,
				dto: {
					title,
					subtitle,
					iconId,
					status,
					isPopular,
					typeId,
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
					<TextInput
						inputTitle="opis (tylko dla menedżrów)"
						value={subtitle}
						onChange={setSubtitle}
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
					<FormCaseTypesList
						lan={itemData.lan}
						chooseItem={setTypeId}
						activeItemId={typeId}
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

export default CaseChangeForm
