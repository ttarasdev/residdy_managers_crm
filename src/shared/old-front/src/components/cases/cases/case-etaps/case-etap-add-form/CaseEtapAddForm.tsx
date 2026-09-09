'use client'

import { Languages } from '@/shared/types-enums/lans'
import c from './CaseEtapAddForm.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { caseStageApi } from '@/api/cases-api/case-stages/case-stages.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormIconsList from '@/components/form-components/form-icons-list/FormIconsList'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import { PUBLIC_BUCKETS } from '@/shared/types-enums/buckets'

interface Props {
	caseId: number
	onClose: () => void
	lan: Languages
}

const CaseEtapAddForm: React.FC<Props> = ({ caseId, lan, onClose }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [title, setTitle] = useState<string | null>(null)
	const [iconId, setIconId] = useState<number | null>(null)

	const mutation = useMutation({
		mutationFn: caseStageApi.create,
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [QUERY_KEYS.CASES_KEY, caseId] })
			setErrorMessage(null)
			onClose()
		},
		onError: (error: any) => {
			const msg =
				error?.data?.message ||
				error?.message ||
				'Wystąpił błąd podczas tworzenia etapu'
			setErrorMessage(msg)
		},
	})

	const submit = (e: React.FormEvent) => {
		e.preventDefault()
		setErrorMessage(null)

		const errors: string[] = []

		if (iconId === null) errors.push('Ikona nie została wybrana')
		if (title === null) errors.push('wpisz nazwę')
		if (errors.length > 0) {
			setErrorMessage(errors.join(', '))
		}

		if (iconId && title) {
			const payload = {
				title: title.trim(),
				iconId,
				caseId,
				lan,
			}
			mutation.mutate(payload)
		}
	}

	return (
		<ModalPortal>
			<div className={c.form__container}>
				<div className={c.form}>
					<FormTitle title="Dodaj etap do sprawy legalizacji" />
					<TextInput
						inputTitle="nazwa"
						value={title}
						onChange={setTitle}
					/>
					<FormIconsList
						bucket={PUBLIC_BUCKETS.ICONS}
						activeIconId={iconId}
						chooseItem={setIconId}
						queryKeys={[QUERY_KEYS.MEDIA_ICON_KEY]}
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

export default CaseEtapAddForm
