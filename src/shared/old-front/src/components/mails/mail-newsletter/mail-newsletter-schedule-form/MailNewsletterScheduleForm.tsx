'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import c from './MailNewsletterScheduleForm.module.scss'
import { useState } from 'react'
import { mailJobsApi } from '@/api/mails-api/mail-jobs/mail-jobs.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import FormChooseDate from '@/components/form-components/form-choose-date/FormChooseDate'

interface Props {
	onClose: () => void
	id: number
}

const MailNewsletterScheduleForm: React.FC<Props> = ({ onClose, id }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [date, setDate] = useState<string | null>(null)

	const mutation = useMutation({
		mutationFn: mailJobsApi.schedule,
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [QUERY_KEYS.MAIL_JOBS, id] })
			setErrorMessage(null)
			onClose()
		},
		onError: (error: any) => {
			const msg =
				error?.data?.message ||
				error?.message ||
				'Wystąpił błąd podczas tworzenia'
			setErrorMessage(msg)
		},
	})

	const submit = (e: React.FormEvent) => {
		e.preventDefault()
		setErrorMessage(null)

		if (date) {
			const payload = {
				id,
				deliverAt: date,
			}

			return mutation.mutate(payload)
		} else {
			setErrorMessage('wypełnij wszystko')
		}
	}

	return (
		<ModalPortal>
			<div className={c.form__container}>
				<div className={c.form}>
					<FormTitle title="Zaplanuj" />
					<FormChooseDate
						inputTitle="wybierz datę"
						value={date}
						onChange={setDate}
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

export default MailNewsletterScheduleForm
