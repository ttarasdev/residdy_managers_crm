'use client'

import { CaseStage } from '@/api/cases-api/case-stages/case-stages.types'
import c from './CaseEtapChangeForm.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import FormIconsList from '@/components/form-components/form-icons-list/FormIconsList'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import { caseStageApi } from '@/api/cases-api/case-stages/case-stages.api'
import { PUBLIC_BUCKETS } from '@/shared/types-enums/buckets'

interface Props {
	stage: CaseStage
	onClose: () => void
}

const CaseEtapChangeForm: React.FC<Props> = ({ stage, onClose }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [title, setTitle] = useState<string | null>(stage.title)
	const [iconId, setIconId] = useState<number | null>(stage.iconId)

	const mutation = useMutation({
		mutationFn: caseStageApi.update,
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [QUERY_KEYS.CASES_KEY, stage.caseId],
			})
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

		if (iconId && title) {
			mutation.mutate({
				id: stage.id,
				dto: {
					title: title.trim(),
					iconId,
				},
			})
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

export default CaseEtapChangeForm
