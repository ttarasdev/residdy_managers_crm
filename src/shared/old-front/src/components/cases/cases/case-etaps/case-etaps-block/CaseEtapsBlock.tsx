'use client'

import c from './CaseEtapsBlock.module.scss'
import { useState } from 'react'
import SubBlockHeader from '@/components/page-block-components/item-page/sub-block/sub-block-header/SubBlockHeader'
import SubBlockItem from '@/components/page-block-components/item-page/sub-block/sub-block-item/SubBlockItem'
import CaseEtapAddForm from '../case-etap-add-form/CaseEtapAddForm'
import { CaseWithStages } from '@/api/cases-api/cases/cases.type'
import CaseEtapChangeForm from '../case-etap-change-form/CaseEtapChangeForm'
import { CaseStage } from '@/api/cases-api/case-stages/case-stages.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { caseStageApi } from '@/api/cases-api/case-stages/case-stages.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { useConfirm } from '@/shared/hooks/useConfirm'
import { ConfirmationModal } from '@/components/features-components/confirmation-modal/ConfirmationModal'

interface Props {
	caseData: CaseWithStages
	setActiveStageId: (id: number | null) => void
	activeStageId: number | null
}

const CaseEtapsBlock: React.FC<Props> = ({
	caseData,
	setActiveStageId,
	activeStageId,
}) => {
	const qc = useQueryClient()

	const [addStageForm, setAddStageForm] = useState(false)
	const [changeStageForm, setChangeStageForm] = useState(false)
	const [activeStage, setActiveStage] = useState<CaseStage | null>(null)

	const chooseStage = (id: number) => {
		const active =
			(caseData.stages.filter((i) => i.id === id)[0] as CaseStage) || null
		setActiveStage(active)
		setChangeStageForm(true)
	}

	const { isOpen, open, confirm, close, isPending } = useConfirm<number>()

	const deleteItem = (id: number) => {
		open({
			payload: id,
			run: caseStageApi.remove,
			invalidateKeys: [[QUERY_KEYS.CASES_KEY, caseData.id]],
		})
	}

	const reorderMutation = useMutation({
		mutationFn: caseStageApi.reorder,
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [QUERY_KEYS.CASES_KEY, caseData.id],
			})
		},
	})

	return (
		<div className={c.block}>
			<SubBlockHeader
				title="etapy"
				iconPath="/block_icons/stages.png"
				setIsFormOpened={() => setAddStageForm(true)}
				addButtonTitle="etap"
			/>
			<div className={c.block__items}>
				{caseData.stages.map((i) => (
					<SubBlockItem
						key={i.id}
						itemId={i.id}
						icon={i.icon}
						title={i.title}
						subtitle={`№ ${i.stageNo}`}
						setChangeFormOpened={chooseStage}
						deleteItem={deleteItem}
						activeItemId={activeStageId}
						setActiveItemId={setActiveStageId}
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
			{addStageForm && (
				<CaseEtapAddForm
					onClose={() => setAddStageForm(false)}
					caseId={caseData.id}
					lan={caseData.lan}
				/>
			)}
			{changeStageForm && activeStage && (
				<CaseEtapChangeForm
					stage={activeStage}
					onClose={() => setChangeStageForm(false)}
				/>
			)}
			<ConfirmationModal
				open={isOpen}
				title="Usuwanie"
				message="Czy na pewno chcesz usunąć ten etap?"
				confirmText="Usuń"
				cancelText="Anuluj"
				onCancel={close}
				onConfirm={confirm}
				isPending={isPending}
			/>
		</div>
	)
}

export default CaseEtapsBlock
