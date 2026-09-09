'use client'

import {
	CaseInstructionStatus,
	CaseInstructionWithBlocks,
	CreateCaseInstructionDto,
	UpdateCaseInstructionDto,
} from '@/api/cases-api/case-instructions/case-instructions.types'
import c from './CaseInstructionChangeForm.module.scss'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Languages } from '@/shared/types-enums/lans'
import { caseInstructionsApi } from '@/api/cases-api/case-instructions/case-instructions.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormSelect from '@/components/form-components/form-select/FormSelect'
import {
	instructionStatusSelectData,
	isPopularSelectData,
	lansSelectData,
} from '@/shared/constants/form-select-data'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import FormVariantsList from '@/components/form-components/form-variants-list/FormVariantsList'
import { PRIVATE_BUCKETS } from '@/shared/types-enums/buckets'

interface Props {
	data: CaseInstructionWithBlocks
	onClose: () => void
}

const CaseInstructionChangeForm: React.FC<Props> = ({ data, onClose }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [title, setTitle] = useState<string | null>(data.title)
	const [description, setDescription] = useState<string | null>(
		data.description,
	)
	const [lan, setLan] = useState<Languages | null>(data.lan as Languages)
	const [headerIconId, setHeaderIconId] = useState<number | null>(
		data.headerIconId,
	)
	const [status, setStatus] = useState<CaseInstructionStatus>(
		data.status as CaseInstructionStatus,
	)
	const [isPopular, setIsPopular] = useState<boolean>(data.isPopular)

	const mutation = useMutation({
		mutationFn: caseInstructionsApi.update,
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [QUERY_KEYS.CASE_INSTRUCTIONS_KEY, data.id],
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

		if (title && description && headerIconId && lan) {
			const dto: UpdateCaseInstructionDto = {
				id: data.id,
				dto: {
					title,
					description,
					headerIconId: headerIconId,
					lan,
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
					<FormTitle title="Zmień instrukclę" />
					<TextInput
						inputTitle="nazwa"
						value={title}
						onChange={setTitle}
					/>
					<TextInput
						inputTitle="opis (tylko dla menedżrów)"
						value={description}
						onChange={setDescription}
					/>
					<FormSelect
						item={lan}
						onChange={setLan}
						options={lansSelectData}
						selectTitle="wybierz język"
					/>
					<FormSelect
						item={status}
						onChange={setStatus}
						options={instructionStatusSelectData}
						selectTitle="wybierz status"
					/>
					<FormSelect
						item={isPopular}
						onChange={setIsPopular}
						options={isPopularSelectData}
						selectTitle="popularność"
					/>
					<FormVariantsList
						bucket={PRIVATE_BUCKETS.CASE_INSTRUCTIONS_TOP_PHOTO}
						activeVariantId={headerIconId}
						chooseItem={setHeaderIconId}
						queryKeys={[QUERY_KEYS.MEDIA_VARIANTS_KEY]}
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

export default CaseInstructionChangeForm
