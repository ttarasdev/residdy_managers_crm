'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import c from './PromocodeChangeForm.module.scss'
import { useState } from 'react'
import {
	ProductType,
	Promocode,
	PromocodeStatus,
	PromocodeType,
} from '@/api/promo-api/promocodes/promocodes.types'
import { promocodesApi } from '@/api/promo-api/promocodes/promocodes.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormSelect from '@/components/form-components/form-select/FormSelect'
import {
	productTypeSelectData,
	promocodeStatusSelectData,
	promocodeTypeSelectData,
} from '@/shared/constants/form-select-data'
import FormChooseDate from '@/components/form-components/form-choose-date/FormChooseDate'
import FormSpecialistList from '@/components/form-components/form-specialist-list/FormSpecialistList'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import FormTextarea from '@/components/form-components/form-textarea/FormTextarea'

interface Props {
	onClose: () => void
	item: Promocode
}

const PromocodeChangeForm: React.FC<Props> = ({ onClose, item }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [code, setCode] = useState<string | null>(item.code)
	const [type, setType] = useState<PromocodeType | null>(item.type)
	const [value, setValue] = useState<string | null>(item.value.toString())
	const [productType, setProductType] = useState<ProductType | null>(
		item.productType,
	)
	const [status, setStatus] = useState<PromocodeStatus>(item.status)
	const [startsAt, setStartsAt] = useState<string | null>(item.startsAt)
	const [expiresAt, setExpiresAt] = useState<string | null>(item.expiresAt)
	const [maxRedemptions, setMaxRedemptions] = useState<string | null>(
		item.maxRedemptions ? item.maxRedemptions.toString() : null,
	)
	const [perUserLimit, setPerUserLimit] = useState<string | null>(
		item.perUserLimit ? item.perUserLimit.toString() : null,
	)
	const [specialistId, setSpecialistId] = useState<number | null>(
		item.specialistId,
	)
	const [notes, setNotes] = useState<string | null>(item.notes)

	const mutation = useMutation({
		mutationFn: promocodesApi.update,
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [QUERY_KEYS.PROMOCODES, item.id] })
			setErrorMessage(null)
			onClose()
		},
		onError: (error: any) => {
			const msg =
				error?.data?.message ||
				error?.message ||
				'Wystąpił błąd podczas zmiany promokodu'
			setErrorMessage(msg)
		},
	})

	const submit = (e: React.FormEvent) => {
		e.preventDefault()
		setErrorMessage(null)

		if (code && type && value && productType) {
			const dto = {
				code: code.trim(),
				type,
				value: Number(value),
				productType,
				status,
				startsAt,
				expiresAt,
				maxRedemptions: Number(maxRedemptions),
				perUserLimit: Number(perUserLimit),
				specialistId,
				notes,
			}
			mutation.mutate({
				id: item.id,
				dto,
			})
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

export default PromocodeChangeForm
