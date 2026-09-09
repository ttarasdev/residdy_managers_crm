'use client'

import {
	CaseStageTask,
	StageTaskTypes,
	UpdateCaseStageTaskDto,
} from '@/api/cases-api/case-stage-tasks/case-stage-tasks.types'
import c from './CaseTaskChangeForm.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { caseStageTasksApi } from '@/api/cases-api/case-stage-tasks/case-stage-tasks.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormSelect from '@/components/form-components/form-select/FormSelect'
import { taskTypesSelectData } from '@/shared/constants/form-select-data'
import FormIconsList from '@/components/form-components/form-icons-list/FormIconsList'
import FormCaseInstructionsList from '@/components/form-components/form-case-instructions-list/FormCaseInstructionsList'
import FormCaseRemindersList from '@/components/form-components/form-case-reminders-list/FormCaseRemindersList'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import { PUBLIC_BUCKETS } from '@/shared/types-enums/buckets'

interface Props {
	caseId: number
	task: CaseStageTask
	onClose: () => void
}

const CaseTaskChangeForm: React.FC<Props> = ({ task, onClose, caseId }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [title, setTitle] = useState<string | null>(task.title)
	const [subtitle, setSubtitle] = useState<string | null>(task.subtitle)
	const [type, setType] = useState<StageTaskTypes | null>(task.type)
	const [iconId, setIconId] = useState<number | null>(task.iconId)
	const [instructionId, setInstructionId] = useState<number | null>(
		task.instructionId || null,
	)
	const [reminderId, setReminderId] = useState<number | null>(
		task.reminderId || null,
	)

	const mutation = useMutation({
		mutationFn: caseStageTasksApi.update,
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [QUERY_KEYS.CASES_KEY, caseId],
			})
			setErrorMessage(null)
			onClose()
		},
		onError: (error: any) => {
			const msg =
				error?.data?.message ||
				error?.message ||
				'Wystąpił błąd podczas tworzenia taska'
			setErrorMessage(msg)
		},
	})

	const submit = (e: React.FormEvent) => {
		e.preventDefault()
		setErrorMessage(null)

		if (!title || !subtitle || !type || !iconId) {
			setErrorMessage('wybierz wszystko')
			return
		}

		if (type === StageTaskTypes.WITH_DATE && !reminderId) {
			setErrorMessage('wybierz przypominałkę')
			return
		}

		if (type === StageTaskTypes.INFO && !instructionId) {
			setErrorMessage('wybierz instrukcję')
			return
		}

		const payload: UpdateCaseStageTaskDto = {
			id: task.id,
			dto: {
				title,
				subtitle,
				type,
				iconId,
				...(type === StageTaskTypes.WITH_DATE &&
					reminderId !== null && {
						reminderId,
					}),
				...(type !== StageTaskTypes.WITH_DATE &&
					instructionId && {
						instructionId,
					}),
			},
		}

		mutation.mutate(payload)
	}

	return (
		<ModalPortal>
			<div className={c.form__container}>
				<div className={c.form}>
					<FormTitle title="Zmień zadanie do etapu sprawy legalizacji" />
					<TextInput
						inputTitle="nazwa"
						value={title}
						onChange={setTitle}
					/>
					<TextInput
						inputTitle="opis"
						value={subtitle}
						onChange={setSubtitle}
					/>
					<FormSelect
						item={type}
						onChange={setType}
						options={taskTypesSelectData}
						selectTitle="wybierz typ"
					/>
					<FormIconsList
						bucket={PUBLIC_BUCKETS.ICONS}
						activeIconId={iconId}
						chooseItem={setIconId}
						queryKeys={[QUERY_KEYS.MEDIA_ICON_KEY]}
					/>
					{type === StageTaskTypes.INFO && (
						<FormCaseInstructionsList
							chooseItem={setInstructionId}
							activeItemId={instructionId}
							lan={task.lan}
						/>
					)}
					{type === StageTaskTypes.WITH_DATE && (
						<FormCaseRemindersList
							chooseItem={setReminderId}
							activeItemId={reminderId}
							lan={task.lan}
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

export default CaseTaskChangeForm
