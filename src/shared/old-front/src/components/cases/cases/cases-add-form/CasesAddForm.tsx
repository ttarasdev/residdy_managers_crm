'use client'

import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import c from './CasesAddForm.module.scss'
import { useState } from 'react'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormSelect from '@/components/form-components/form-select/FormSelect'
import { lansSelectData } from '@/shared/constants/form-select-data'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import FormIconsList from '@/components/form-components/form-icons-list/FormIconsList'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import FormCaseTypesList from '@/components/form-components/form-case-types-list/FormCaseTypesList'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Languages } from '@/shared/types-enums/lans'
import { casesApi } from '@/api/cases-api/cases/cases.api'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import { PUBLIC_BUCKETS } from '@/shared/types-enums/buckets'

interface Props {
	onClose: () => void
}

const CasesAddForm: React.FC<Props> = ({ onClose }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [title, setTitle] = useState<string | null>(null)
	const [subtitle, setSubtitle] = useState<string | null>(null)
	const [lan, setLan] = useState<Languages | null>(null)
	const [iconId, setIconId] = useState<number | null>(null)
	const [typeId, setTypeId] = useState<number | null>(null)

	const mutation = useMutation({
		mutationFn: casesApi.create,
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [QUERY_KEYS.CASES_KEY] })
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

		if (iconId && lan && title && subtitle && typeId) {
			const payload = {
				title: title.trim(),
				subtitle: subtitle.trim(),
				iconId,
				lan,
				typeId,
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
						value={subtitle}
						onChange={setSubtitle}
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
					<FormCaseTypesList
						lan={lan}
						chooseItem={setTypeId}
						activeItemId={typeId}
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

export default CasesAddForm
