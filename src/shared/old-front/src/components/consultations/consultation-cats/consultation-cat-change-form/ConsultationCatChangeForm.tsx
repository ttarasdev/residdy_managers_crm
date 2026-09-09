'use client'

import { ConsultationCategory } from '@/api/consultations-api/consultation-categories/consultation-categories.types'
import c from './ConsultationCatChangeForm.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { consultationCategoriesApi } from '@/api/consultations-api/consultation-categories/consultation-categories.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormIconsList from '@/components/form-components/form-icons-list/FormIconsList'
import { PUBLIC_BUCKETS } from '@/shared/types-enums/buckets'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import FormSelect from '@/components/form-components/form-select/FormSelect'
import {
	isActiveSelectData,
	isPopularSelectData,
} from '@/shared/constants/form-select-data'

interface Props {
	onClose: () => void
	type: ConsultationCategory
}

const ConsultationCatChangeForm: React.FC<Props> = ({ onClose, type }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [titleUA, setTitleUA] = useState<string | null>(type.titleUa)
	const [titlePL, setTitlePL] = useState<string | null>(type.titlePl)
	const [titleEN, setTitleEN] = useState<string | null>(type.titleEn)
	const [titleRU, setTitleRU] = useState<string | null>(type.titleRu)
	const [iconId, setIconId] = useState<number | null>(type.assetId)
	const [isActive, setIsActive] = useState<boolean>(type.isActive)
	const [isPopular, setIsPopular] = useState<boolean>(type.isPopular)

	const mutation = useMutation({
		mutationFn: consultationCategoriesApi.update,
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [QUERY_KEYS.CONSULTATION_CATS, type.id],
			})
			setErrorMessage(null)
			onClose()
		},
		onError: (error: any) => {
			const msg =
				error?.data?.message ||
				error?.message ||
				'Wystąpił błąd podczas zmiany typu'
			setErrorMessage(msg)
		},
	})

	const submit = (e: React.FormEvent) => {
		e.preventDefault()
		setErrorMessage(null)

		if (iconId && titleUA && titlePL && titleEN && titleRU) {
			const payload = {
				id: type.id,
				dto: {
					titleUa: titleUA.trim(),
					titlePl: titlePL.trim(),
					titleEn: titleEN.trim(),
					titleRu: titleRU.trim(),
					assetId: iconId,
					isPopular,
					isActive,
				},
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
					<FormTitle title="Zmień typ konsultacji" />
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
					<FormSelect
						item={isPopular}
						onChange={setIsPopular}
						options={isPopularSelectData}
						selectTitle="popularność"
					/>
					<FormSelect
						item={isActive}
						onChange={setIsActive}
						options={isActiveSelectData}
						selectTitle="status"
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

export default ConsultationCatChangeForm
