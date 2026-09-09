'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import c from './ConsultationCatsAddForm.module.scss'
import { useState } from 'react'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormIconsList from '@/components/form-components/form-icons-list/FormIconsList'
import { PUBLIC_BUCKETS } from '@/shared/types-enums/buckets'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import { consultationCategoriesApi } from '@/api/consultations-api/consultation-categories/consultation-categories.api'

interface Props {
	onClose: () => void
}

const ConsultationCatsAddForm: React.FC<Props> = ({ onClose }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [titleUA, setTitleUA] = useState<string | null>(null)
	const [titlePL, setTitlePL] = useState<string | null>(null)
	const [titleEN, setTitleEN] = useState<string | null>(null)
	const [titleRU, setTitleRU] = useState<string | null>(null)
	const [iconId, setIconId] = useState<number | null>(null)

	const mutation = useMutation({
		mutationFn: consultationCategoriesApi.create,
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [QUERY_KEYS.CONSULTATION_CATS] })
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

		if (iconId && titleUA && titlePL && titleEN && titleRU) {
			const payload = {
				titleUa: titleUA.trim(),
				titlePl: titlePL.trim(),
				titleEn: titleEN.trim(),
				titleRu: titleRU.trim(),
				assetId: iconId,
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
					<FormTitle title="Dodaj typ konsultacji" />
					<TextInput
						inputTitle="nazwa UA"
						value={titleUA}
						onChange={setTitleUA}
					/>
					<TextInput
						inputTitle="nazwa PL"
						value={titlePL}
						onChange={setTitlePL}
					/>
					<TextInput
						inputTitle="nazwa EN"
						value={titleEN}
						onChange={setTitleEN}
					/>
					<TextInput
						inputTitle="nazwa RU"
						value={titleRU}
						onChange={setTitleRU}
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

export default ConsultationCatsAddForm
