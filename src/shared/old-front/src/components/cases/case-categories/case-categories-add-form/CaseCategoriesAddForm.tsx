'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import c from './CaseCategoriesAddForm.module.scss'
import { useState } from 'react'
import { Languages } from '@/shared/types-enums/lans'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormSelect from '@/components/form-components/form-select/FormSelect'
import { lansSelectData } from '@/shared/constants/form-select-data'
import FormIconsList from '@/components/form-components/form-icons-list/FormIconsList'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import { caseTypesApi } from '@/api/cases-api/cases-types/case-types.api'
import { PUBLIC_BUCKETS } from '@/shared/types-enums/buckets'

interface Props {
	onClose: () => void
}

const CaseCategoriesAddForm: React.FC<Props> = ({ onClose }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [title, setTitle] = useState<string | null>(null)
	const [description, setDescription] = useState<string | null>(null)
	const [lan, setLan] = useState<Languages | null>(null)
	const [iconId, setIconId] = useState<number | null>(null)

	const mutation = useMutation({
		mutationFn: caseTypesApi.create,
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [QUERY_KEYS.CASE_TYPES_KEY] })
			setErrorMessage(null)
			onClose()
		},
		onError: (error: any) => {
			const msg =
				error?.data?.message ||
				error?.message ||
				'Wystąpił błąd podczas tworzenia posta'
			setErrorMessage(msg)
		},
	})

	const submit = (e: React.FormEvent) => {
		e.preventDefault()
		setErrorMessage(null)

		if (iconId && lan && title && description) {
			const payload = {
				title: title.trim(),
				description: description.trim(),
				iconId,
				lan,
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
					<FormTitle title="Dodaj sprawę legalizacji" />
					<TextInput
						inputTitle="nazwa"
						value={title}
						onChange={setTitle}
					/>
					<TextInput
						inputTitle="opis (tylko dla menedżrów)"
						value={description}
						onChange={setDescription}
					/>
					<FormSelect
						item={lan}
						onChange={setLan}
						options={lansSelectData}
						selectTitle="wybierz język"
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

export default CaseCategoriesAddForm
