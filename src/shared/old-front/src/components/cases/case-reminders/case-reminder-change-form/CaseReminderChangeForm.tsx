'use client'

import {
	CaseReminder,
	UpdateCaseReminderBodyDto,
} from '@/api/cases-api/case-reminders/case-reminders.types'
import c from './CaseReminderChangeForm.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Languages } from '@/shared/types-enums/lans'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { caseRemindersApi } from '@/api/cases-api/case-reminders/case-reminders.api'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormSelect from '@/components/form-components/form-select/FormSelect'
import { lansSelectData } from '@/shared/constants/form-select-data'
import FormFooter from '@/components/form-components/form-footer/FormFooter'

interface Props {
	reminder: CaseReminder
	onClose: () => void
}

const CaseReminderChangeForm: React.FC<Props> = ({ onClose, reminder }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [topic, setTopic] = useState<string | null>(reminder.topic)
	const [text, setText] = useState<string | null>(reminder.text)
	const [lan, setLan] = useState<Languages | null>(reminder.lan)

	const mutation = useMutation({
		mutationFn: caseRemindersApi.update,
		onSuccess: (res: any) => {
			qc.invalidateQueries({
				queryKey: [QUERY_KEYS.CASE_REMINDERS_KEY, reminder.id],
			})
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

		if (topic && text && lan) {
			const dto: UpdateCaseReminderBodyDto = {
				topic,
				text,
				lan,
			}

			mutation.mutate({ dto, id: reminder.id })
		} else {
			setErrorMessage('wypełnij wszystko')
		}
	}

	return (
		<ModalPortal>
			<div className={c.form__container}>
				<div className={c.form}>
					<FormTitle title="Zmień przypomnialkę do zadań" />
					<TextInput
						inputTitle="temat"
						value={topic}
						onChange={setTopic}
					/>
					<TextInput
						inputTitle="tekst"
						value={text}
						onChange={setText}
					/>
					<FormSelect
						item={lan}
						onChange={setLan}
						options={lansSelectData}
						selectTitle="wybierz język"
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

export default CaseReminderChangeForm
