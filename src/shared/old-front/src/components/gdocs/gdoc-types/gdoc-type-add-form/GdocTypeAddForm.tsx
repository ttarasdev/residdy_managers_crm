'use client'

import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import c from './GdocTypeAddForm.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { gdocsTypesApi } from '@/api/gdocs-api/gdocs-types/gdocs-types.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormIconsList from '@/components/form-components/form-icons-list/FormIconsList'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import { PUBLIC_BUCKETS } from '@/shared/types-enums/buckets'

interface Props {
	onClose: () => void
}

const GdocTypeAddForm: React.FC<Props> = ({ onClose }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [titleUA, setTitleUA] = useState<string | null>(null)
	const [titlePL, setTitlePL] = useState<string | null>(null)
	const [titleEN, setTitleEN] = useState<string | null>(null)
	const [titleRU, setTitleRU] = useState<string | null>(null)
	const [iconId, setIconId] = useState<number | null>(null)

	const mutation = useMutation({
		mutationFn: gdocsTypesApi.create,
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [QUERY_KEYS.GDOC_TYPES] })
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
				titleUA: titleUA.trim(),
				titlePL: titlePL.trim(),
				titleEN: titleEN.trim(),
				titleRU: titleRU.trim(),
				iconId,
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
					<FormTitle title="Dodaj typ plików do generowania" />
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

export default GdocTypeAddForm
