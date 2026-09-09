'use client'

import { CaseInstructionWithBlocks } from '@/api/cases-api/case-instructions/case-instructions.types'
import c from './InstructionBlocksBlock.module.scss'
import SubBlockHeader from '@/components/page-block-components/item-page/sub-block/sub-block-header/SubBlockHeader'
import { useState } from 'react'
import SubBlockItem from '@/components/page-block-components/item-page/sub-block/sub-block-item/SubBlockItem'
import InstructionAddBlockForm from '../instruction-add-block-form/InstructionAddBlockForm'
import { CaseInstructionBlock } from '@/api/cases-api/case-instruction-blocks/case-instruction-blocks.types'
import InstructionChangeBlockForm from '../instruction-change-block-form/InstructionChangeBlockForm'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { caseInstructionBlocksApi } from '@/api/cases-api/case-instruction-blocks/case-instruction-blocks.api'
import { ConfirmationModal } from '@/components/features-components/confirmation-modal/ConfirmationModal'
import { useConfirm } from '@/shared/hooks/useConfirm'

interface Props {
	data: CaseInstructionWithBlocks
}

const InstructionBlocksBlock: React.FC<Props> = ({ data }) => {
	const qc = useQueryClient()
	const [addBlockForm, setAddBlockForm] = useState(false)
	const [changeBlockForm, setChangeBlockForm] = useState(false)
	const [activeBlock, setActiveBlock] = useState<CaseInstructionBlock | null>(
		null,
	)

	const chooseBlock = (id: number) => {
		const active = data.blocks.filter((item) => item.id === id)[0] || null
		setActiveBlock(active)
		setChangeBlockForm(true)
	}

	const reorderMutation = useMutation({
		mutationFn: caseInstructionBlocksApi.reorder,
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [QUERY_KEYS.CASE_INSTRUCTIONS_KEY, data.id],
			})
		},
	})

	const { isOpen, open, confirm, close, isPending } = useConfirm<number>()

	const deleteItem = (id: number) => {
		open({
			payload: id,
			run: caseInstructionBlocksApi.remove,
			invalidateKeys: [[QUERY_KEYS.CASE_INSTRUCTIONS_KEY, data.id]],
		})
	}

	return (
		<div className={c.block}>
			<SubBlockHeader
				title="bloki"
				iconPath="/block_icons/blocks.png"
				setIsFormOpened={() => setAddBlockForm(true)}
				addButtonTitle="blok"
			/>
			<div className={c.block__items}>
				{data.blocks.map((i) => (
					<SubBlockItem
						key={i.id}
						itemId={i.id}
						title={`typ: ${i.type.toString()}`}
						subtitle={`id: ${i.id}`}
						setChangeFormOpened={chooseBlock}
						deleteItem={deleteItem}
						toggleDown={(id: number) => {
							reorderMutation.mutate({
								id,
								dto: { direction: 'down' },
							})
						}}
						toggleUp={(id: number) => {
							reorderMutation.mutate({
								id,
								dto: { direction: 'up' },
							})
						}}
					/>
				))}
			</div>
			{addBlockForm && (
				<InstructionAddBlockForm
					instructionId={data.id}
					onClose={() => setAddBlockForm(false)}
				/>
			)}
			{changeBlockForm && activeBlock && (
				<InstructionChangeBlockForm
					block={activeBlock}
					onClose={() => setChangeBlockForm(false)}
				/>
			)}
			<ConfirmationModal
				open={isOpen}
				title="Usuwanie"
				message="Czy na pewno chcesz wyrzucić ten blok?"
				confirmText="Usuń"
				cancelText="Anuluj"
				onCancel={close}
				onConfirm={confirm}
				isPending={isPending}
			/>
		</div>
	)
}

export default InstructionBlocksBlock
