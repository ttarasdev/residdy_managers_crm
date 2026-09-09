'use client'

import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import c from './CaseInstructionAddForm.module.scss'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Languages } from '@/shared/types-enums/lans'
import {
	CaseInstruction,
	CreateCaseInstructionDto,
} from '@/api/cases-api/case-instructions/case-instructions.types'
import { caseInstructionsApi } from '@/api/cases-api/case-instructions/case-instructions.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormSelect from '@/components/form-components/form-select/FormSelect'
import { lansSelectData } from '@/shared/constants/form-select-data'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import FormVariantsList from '@/components/form-components/form-variants-list/FormVariantsList'
import { PRIVATE_BUCKETS } from '@/shared/types-enums/buckets'

interface Props {
	onClose: () => void
}

const CaseInstructionAddForm: React.FC<Props> = ({ onClose }) => {
	const qc = useQueryClient()

	const [title, setTitle] = useState<string | null>(null)
	const [description, setDescription] = useState<string | null>(null)
	const [headerPhotoId, setHeaderPhotoId] = useState<number | null>(null)
	const [lan, setLan] = useState<Languages | null>(null)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const mutation = useMutation<
		CaseInstruction,
		Error,
		CreateCaseInstructionDto
	>({
		mutationFn: caseInstructionsApi.create,
		onSuccess: (res: any) => {
			qc.invalidateQueries({
				queryKey: [QUERY_KEYS.CASE_INSTRUCTIONS_KEY],
			})
			setTitle(null)
			setDescription(null)
			setHeaderPhotoId(null)
			setLan(null)
			setErrorMessage(null)
			onClose()
		},
		onError: (error: any) => {
			const msg =
				error?.data?.message ||
				error?.message ||
				'Wystąpił błąd podczas wysyłania pliku'
			setErrorMessage(msg)
		},
	})

	const submit = (e: React.FormEvent) => {
		e.preventDefault()
		setErrorMessage(null)

		if (title && description && headerPhotoId && lan) {
			const dto: CreateCaseInstructionDto = {
				title,
				description,
				headerIconId: headerPhotoId,
				lan,
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
					<FormTitle title="Dodaj sprawę legalizacji" />
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
					<FormVariantsList
						bucket={PRIVATE_BUCKETS.CASE_INSTRUCTIONS_TOP_PHOTO}
						activeVariantId={headerPhotoId}
						chooseItem={setHeaderPhotoId}
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

export default CaseInstructionAddForm
