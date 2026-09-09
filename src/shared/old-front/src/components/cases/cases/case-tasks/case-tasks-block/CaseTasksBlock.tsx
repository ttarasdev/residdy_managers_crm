'use client'

import { useState } from 'react'
import c from './CaseTasksBlock.module.scss'
import SubBlockHeader from '@/components/page-block-components/item-page/sub-block/sub-block-header/SubBlockHeader'
import SubBlockItem from '@/components/page-block-components/item-page/sub-block/sub-block-item/SubBlockItem'
import CaseTaskAddForm from '../case-task-add-form/CaseTaskAddForm'
import { CaseWithStages } from '@/api/cases-api/cases/cases.type'
import { CaseStageTask } from '@/api/cases-api/case-stage-tasks/case-stage-tasks.types'
import CaseTaskChangeForm from '../case-task-change-form/CaseTaskChangeForm'
import { useConfirm } from '@/shared/hooks/useConfirm'
import { caseStageTasksApi } from '@/api/cases-api/case-stage-tasks/case-stage-tasks.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { ConfirmationModal } from '@/components/features-components/confirmation-modal/ConfirmationModal'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface Props {
	data: CaseWithStages
	activeStageId: number | null
}

const CaseTasksBlock: React.FC<Props> = ({ activeStageId, data }) => {
	const qc = useQueryClient()

	const [isChangeFormOpened, setIsChangeFormOpened] = useState(false)
	const [isAddFormOpened, setIsAddFormOpened] = useState(false)
	const [activeTask, setActiveTask] = useState<CaseStageTask | null>(null)

	const tasksData = activeStageId
		? (data.stages.filter((i) => i.id === activeStageId)[0]
				.tasks as CaseStageTask[])
		: ([] as CaseStageTask[])

	const chooseTask = (id: number) => {
		const active =
			(tasksData.filter((i) => i.id === id)[0] as CaseStageTask) || null
		setActiveTask(active)
		setIsChangeFormOpened(true)
	}

	const reorderMutation = useMutation({
		mutationFn: caseStageTasksApi.reorder,
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [QUERY_KEYS.CASES_KEY, data.id],
			})
		},
	})

	const { isOpen, open, confirm, close, isPending } = useConfirm<number>()

	const deleteItem = (id: number) => {
		open({
			payload: id,
			run: caseStageTasksApi.remove,
			invalidateKeys: [[QUERY_KEYS.CASES_KEY, data.id]],
		})
	}

	return (
		<div className={c.block}>
			<SubBlockHeader
				title="zadania"
				iconPath="/block_icons/tasks.png"
				setIsFormOpened={() => setIsAddFormOpened(true)}
				addButtonTitle="zadanie"
			/>
			<div className={c.block__items}>
				{tasksData.map((i) => (
					<SubBlockItem
						key={i.id}
						itemId={i.id}
						icon={i.icon}
						title={i.title}
						subtitle={i.subtitle}
						setChangeFormOpened={chooseTask}
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
			{isChangeFormOpened && activeTask && (
				<CaseTaskChangeForm
					caseId={data.id}
					task={activeTask}
					onClose={() => setIsChangeFormOpened(false)}
				/>
			)}
			{isAddFormOpened && activeStageId && (
				<CaseTaskAddForm
					stageId={activeStageId}
					caseId={data.id}
					lan={data.lan}
					onClose={() => setIsAddFormOpened(false)}
				/>
			)}
			<ConfirmationModal
				open={isOpen}
				title="Usuwanie"
				message="Czy na pewno chcesz usunąć tą publikację?"
				confirmText="Usuń"
				cancelText="Anuluj"
				onCancel={close}
				onConfirm={confirm}
				isPending={isPending}
			/>
		</div>
	)
}

export default CaseTasksBlock
