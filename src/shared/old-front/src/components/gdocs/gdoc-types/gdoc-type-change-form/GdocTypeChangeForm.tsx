'use client'

import {
	GdocType,
	GdocTypeStatus,
} from '@/api/gdocs-api/gdocs-types/gdocs-types.types'
import c from './GdocTypeChangeForm.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { gdocsTypesApi } from '@/api/gdocs-api/gdocs-types/gdocs-types.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormIconsList from '@/components/form-components/form-icons-list/FormIconsList'
import { PUBLIC_BUCKETS } from '@/shared/types-enums/buckets'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import FormSelect from '@/components/form-components/form-select/FormSelect'
import { isPopularSelectData } from '@/shared/constants/form-select-data'
import { gdocsTypeStatusFilterData } from '@/shared/constants/new-filters-data'

interface Props {
	type: GdocType
	onClose: () => void
}

const GdocTypeChangeForm: React.FC<Props> = ({ type, onClose }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [titleUA, setTitleUA] = useState<string | null>(type.titleUA)
	const [titlePL, setTitlePL] = useState<string | null>(type.titlePL)
	const [titleEN, setTitleEN] = useState<string | null>(type.titleEN)
	const [titleRU, setTitleRU] = useState<string | null>(type.titleRU)
	const [iconId, setIconId] = useState<number | null>(type.iconId)
	const [isPopular, setIsPopular] = useState<boolean>(type.isPopular)
	const [status, setStatus] = useState<GdocTypeStatus>(
		type.status as GdocTypeStatus,
	)

	const mutation = useMutation({
		mutationFn: gdocsTypesApi.update,
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [QUERY_KEYS.GDOC_TYPES, type.id] })
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
				isPopular,
				status,
			}
			mutation.mutate({
				id: type.id,
				dto: payload,
			})
		} else {
			setErrorMessage('wypełnij wszystko')
		}
	}

	return (
		<ModalPortal>
			<div className={c.form__container}>
				<div className={c.form}>
					<FormTitle title="Zmień typ plików do generowania" />
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
						item={status}
						onChange={setStatus}
						options={gdocsTypeStatusFilterData}
						selectTitle="wybierz status"
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

export default GdocTypeChangeForm
