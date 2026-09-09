'use client'

import { Languages } from '@/shared/types-enums/lans'
import c from './CaseTaskAddForm.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import {
	CreateCaseStageTaskDto,
	StageTaskTypes,
} from '@/api/cases-api/case-stage-tasks/case-stage-tasks.types'
import { caseStageTasksApi } from '@/api/cases-api/case-stage-tasks/case-stage-tasks.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormIconsList from '@/components/form-components/form-icons-list/FormIconsList'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import FormSelect from '@/components/form-components/form-select/FormSelect'
import { taskTypesSelectData } from '@/shared/constants/form-select-data'
import FormCaseInstructionsList from '@/components/form-components/form-case-instructions-list/FormCaseInstructionsList'
import FormCaseRemindersList from '@/components/form-components/form-case-reminders-list/FormCaseRemindersList'
import { PUBLIC_BUCKETS } from '@/shared/types-enums/buckets'

interface Props {
	stageId: number
	lan: Languages
	caseId: number
	onClose: () => void
}

const CaseTaskAddForm: React.FC<Props> = ({
	stageId,
	onClose,
	caseId,
	lan,
}) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [title, setTitle] = useState<string | null>(null)
	const [subtitle, setSubtitle] = useState<string | null>(null)
	const [type, setType] = useState<StageTaskTypes | null>(null)
	const [iconId, setIconId] = useState<number | null>(null)
	const [instructionId, setInstructionId] = useState<number | null>(null)
	const [reminderId, setReminderId] = useState<number | null>(null)

	const mutation = useMutation({
		mutationFn: caseStageTasksApi.create,
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

		const payload: CreateCaseStageTaskDto = {
			stageId,
			lan,
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
		}

		mutation.mutate(payload)
	}

	return (
		<ModalPortal>
			<div className={c.form__container}>
				<div className={c.form}>
					<FormTitle title="Dodaj zadanie do etapu sprawy legalizacji" />
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
							lan={lan}
						/>
					)}
					{type === StageTaskTypes.WITH_DATE && (
						<FormCaseRemindersList
							chooseItem={setReminderId}
							activeItemId={reminderId}
							lan={lan}
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

export default CaseTaskAddForm
