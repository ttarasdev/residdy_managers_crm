'use client'

import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import c from './PromocodesAddForm.module.scss'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import {
	ProductType,
	PromocodeStatus,
	PromocodeType,
} from '@/api/promo-api/promocodes/promocodes.types'
import { promocodesApi } from '@/api/promo-api/promocodes/promocodes.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormSelect from '@/components/form-components/form-select/FormSelect'
import {
	productTypeSelectData,
	promocodeStatusSelectData,
	promocodeTypeSelectData,
} from '@/shared/constants/form-select-data'
import FormChooseDate from '@/components/form-components/form-choose-date/FormChooseDate'
import FormTextarea from '@/components/form-components/form-textarea/FormTextarea'
import FormSpecialistList from '@/components/form-components/form-specialist-list/FormSpecialistList'

interface Props {
	onClose: () => void
}

const PromocodesAddForm: React.FC<Props> = ({ onClose }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [code, setCode] = useState<string | null>(null)
	const [type, setType] = useState<PromocodeType | null>(null)
	const [value, setValue] = useState<string | null>(null)
	const [productType, setProductType] = useState<ProductType | null>(null)
	const [status, setStatus] = useState<PromocodeStatus | null>(null)
	const [startsAt, setStartsAt] = useState<string | null>(null)
	const [expiresAt, setExpiresAt] = useState<string | null>(null)
	const [maxRedemptions, setMaxRedemptions] = useState<string | null>(null)
	const [perUserLimit, setPerUserLimit] = useState<string | null>(null)
	const [specialistId, setSpecialistId] = useState<number | null>(null)
	const [notes, setNotes] = useState<string | null>(null)

	const mutation = useMutation({
		mutationFn: promocodesApi.create,
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [QUERY_KEYS.PROMOCODES] })
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

		if (code && type && value && productType) {
			const payload = {
				code: code.trim(),
				type,
				value: Number(value),
				productType,
				...(status ? { status } : {}),
				...(startsAt ? { startsAt } : {}),
				...(expiresAt ? { expiresAt } : {}),
				...(maxRedemptions
					? { maxRedemptions: Number(maxRedemptions) }
					: {}),
				...(perUserLimit ? { perUserLimit: Number(perUserLimit) } : {}),
				...(specialistId ? { specialistId } : {}),
				...(notes?.trim() ? { notes: notes.trim() } : {}),
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
					<TextInput
						inputTitle="kod*"
						value={code}
						onChange={setCode}
					/>
					<FormSelect
						item={type}
						onChange={setType}
						options={promocodeTypeSelectData}
						selectTitle="wybierz typ*"
					/>
					<TextInput
						inputTitle="liczba % lub PLN*"
						value={value}
						onChange={setValue}
					/>
					<FormSelect
						item={productType}
						onChange={setProductType}
						options={productTypeSelectData}
						selectTitle="wybierz produkt*"
					/>
					<FormSelect
						item={status}
						onChange={setStatus}
						options={promocodeStatusSelectData}
						selectTitle="wybierz status"
					/>
					<FormChooseDate
						value={startsAt}
						onChange={setStartsAt}
						inputTitle="data aktywacji"
					/>
					<FormChooseDate
						value={expiresAt}
						onChange={setExpiresAt}
						inputTitle="data ukończenia"
					/>
					<TextInput
						inputTitle="maksymacja liczba promocodów"
						value={maxRedemptions}
						onChange={setMaxRedemptions}
					/>
					<TextInput
						inputTitle="maksymacja liczba dla wykorzystania dla 1 użytkownika"
						value={perUserLimit}
						onChange={setPerUserLimit}
					/>
					<FormSpecialistList
						chooseItem={setSpecialistId}
						activeItemId={specialistId}
					/>
					<FormTextarea
						value={notes}
						onChange={setNotes}
						inputTitle="uwagi"
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

export default PromocodesAddForm
