'use client'

import {
	CaseInstructionBlock,
	InstructionBlockType,
} from '@/api/cases-api/case-instruction-blocks/case-instruction-blocks.types'
import c from './InstructionChangeBlockForm.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import TipTapInput, {
	EMPTY_DOC,
} from '@/components/form-components/tiptap-input/TipTapInput'
import { caseInstructionBlocksApi } from '@/api/cases-api/case-instruction-blocks/case-instruction-blocks.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import FormSelect from '@/components/form-components/form-select/FormSelect'
import { instructionBlockTypeSelectData } from '@/shared/constants/form-select-data'
import FormVariantsList from '@/components/form-components/form-variants-list/FormVariantsList'
import { BUCKETS } from '@/shared/types-enums/buckets'
import FormFooter from '@/components/form-components/form-footer/FormFooter'

interface Props {
	block: CaseInstructionBlock
	onClose: () => void
}

const InstructionChangeBlockForm: React.FC<Props> = ({ block, onClose }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const IBT = InstructionBlockType

	const [contentJson, setContentJson] = useState<Record<string, any>>(
		block.contentJson || EMPTY_DOC,
	)
	const [variantId, setVariantId] = useState<number | null>(
		block.variantId || null,
	)
	const [type, setType] = useState<InstructionBlockType | null>(block.type)

	const mutation = useMutation({
		mutationFn: caseInstructionBlocksApi.update,
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [QUERY_KEYS.CASE_INSTRUCTION_BLOCKS_KEY, block.id],
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

		if (type === InstructionBlockType.PHOTO && variantId) {
			mutation.mutate({
				id: block.instructionId,
				data: {
					variantId,
					type,
				},
			})
		}
		if (type === InstructionBlockType.TEXT && contentJson && !variantId) {
			mutation.mutate({
				id: block.instructionId,
				data: {
					contentJson,
					type,
				},
			})
		}
	}

	return (
		<ModalPortal>
			<div className={c.form__container}>
				<div className={c.form}>
					<FormTitle title="Zmień blok do instrukcji" />
					<FormSelect
						item={type}
						onChange={setType}
						options={instructionBlockTypeSelectData}
						selectTitle="wybierz typ"
					/>
					{type == IBT.PHOTO && (
						<FormVariantsList
							bucket={BUCKETS.CASE_INSTRUCTION_BLOCK_PHOTO}
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

export default InstructionChangeBlockForm
