'use client'

import { useState } from 'react'
import c from './GdocVarsAddForm.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { gdocsVarsApi } from '@/api/gdocs-api/gdocs-vars/gdocs-vars.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormFooter from '@/components/form-components/form-footer/FormFooter'

interface Props {
	onClose: () => void
}

const GdocVarsAddForm: React.FC<Props> = ({ onClose }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [key, setKey] = useState<string | null>(null)
	const [labelPL, setLabelPL] = useState<string | null>(null)
	const [labelEN, setLabelEN] = useState<string | null>(null)
	const [labelUA, setLabelUA] = useState<string | null>(null)
	const [labelRU, setLabelRU] = useState<string | null>(null)

	const mutation = useMutation({
		mutationFn: gdocsVarsApi.create,
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [QUERY_KEYS.GDOC_VARS] })
			setErrorMessage(null)
			onClose()
		},
		onError: (error: any) => {
			const msg =
				error?.data?.message ||
				error?.message ||
				'Wystąpił błąd podczas tworzenia typu'
			setErrorMessage(msg)
		},
	})

	const submit = (e: React.FormEvent) => {
		e.preventDefault()
		setErrorMessage(null)

		if (key && labelUA && labelPL && labelEN && labelRU) {
			const payload = {
				labelUA: labelUA.trim(),
				labelPL: labelPL.trim(),
				labelEN: labelEN.trim(),
				labelRU: labelRU.trim(),
				key,
			}
			mutation.mutate(payload)
		} else {
			setErrorMessage('wypełnij wszystko')
		}
	}

	return (
		<ModalPortal>
			<div className={c.form__container}>
				<div className={c.form}>
					<FormTitle title="Dodaj zmienną do plików do generowania" />
					<TextInput
						inputTitle="nazwa UA"
						value={labelUA}
						onChange={setLabelUA}
					/>
					<TextInput
						inputTitle="nazwa PL"
						value={labelPL}
						onChange={setLabelPL}
					/>
					<TextInput
						inputTitle="nazwa EN"
						value={labelEN}
						onChange={setLabelEN}
					/>
					<TextInput
						inputTitle="nazwa RU"
						value={labelRU}
						onChange={setLabelRU}
					/>
					<TextInput
						inputTitle="zmienna"
						value={key}
						onChange={setKey}
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

export default GdocVarsAddForm
