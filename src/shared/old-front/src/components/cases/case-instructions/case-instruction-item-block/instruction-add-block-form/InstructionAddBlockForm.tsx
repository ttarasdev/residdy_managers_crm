'use client'

import { InstructionBlockType } from '@/api/cases-api/case-instruction-blocks/case-instruction-blocks.types'
import c from './InstructionAddBlockForm.module.scss'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { caseInstructionBlocksApi } from '@/api/cases-api/case-instruction-blocks/case-instruction-blocks.api'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import FormSelect from '@/components/form-components/form-select/FormSelect'
import { instructionBlockTypeSelectData } from '@/shared/constants/form-select-data'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import FormVariantsList from '@/components/form-components/form-variants-list/FormVariantsList'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import TipTapInput, {
	EMPTY_DOC,
} from '@/components/form-components/tiptap-input/TipTapInput'
import { PRIVATE_BUCKETS } from '@/shared/types-enums/buckets'

interface Props {
	instructionId: number
	onClose: () => void
}

const InstructionAddBlockForm: React.FC<Props> = ({
	onClose,
	instructionId,
}) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const IBT = InstructionBlockType

	const [contentJson, setContentJson] =
		useState<Record<string, any>>(EMPTY_DOC)
	const [variantId, setVariantId] = useState<number | null>(null)
	const [type, setType] = useState<InstructionBlockType | null>(null)

	const mutation = useMutation({
		mutationFn: caseInstructionBlocksApi.create,
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [] })
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

		if (type === IBT.PHOTO && variantId) {
			mutation.mutate({
				instructionId,
				variantId,
				type,
			})
		}
		if (type === IBT.TEXT && contentJson && !variantId) {
			mutation.mutate({
				instructionId,
				contentJson,
				type,
			})
		}
	}

	return (
		<ModalPortal>
			<div className={c.form__container}>
				<div className={c.form}>
					<FormTitle title="Dodaj blok do instrukcji" />
					<FormSelect
						item={type}
						onChange={setType}
						options={instructionBlockTypeSelectData}
						selectTitle="wybierz typ"
					/>
					{type == IBT.PHOTO && (
						<FormVariantsList
							bucket={
								PRIVATE_BUCKETS.CASE_INSTRUCTION_BLOCK_PHOTO
							}
							activeVariantId={variantId}
							chooseItem={setVariantId}
							queryKeys={[QUERY_KEYS.MEDIA_VARIANTS_KEY]}
						/>
					)}
					{type === IBT.TEXT && (
						<TipTapInput
							contentJson={contentJson}
							setContentJson={setContentJson}
						/>
					)}
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

export default InstructionAddBlockForm
