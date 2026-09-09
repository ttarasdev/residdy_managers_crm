'use client'

import c from './ChangePartnerInfoForm.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import {
	PartnerInfo,
	UpdatePartnerInfoDto,
} from '@/api/partners-api/partners-info/partners-info.types'
import { partnersInfoApi } from '@/api/partners-api/partners-info/partners-info.api'
import FormTextarea from '@/components/form-components/form-textarea/FormTextarea'

interface Props {
	itemData: PartnerInfo
	onClose: () => void
}

const ChangePartnerInfoForm: React.FC<Props> = ({ itemData, onClose }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>()

	const [shortDescriptionUa, setShortDescriptionUa] = useState<string | null>(
		itemData.shortDescriptionUa,
	)
	const [shortDescriptionEn, setShortDescriptionEn] = useState<string | null>(
		itemData.shortDescriptionEn,
	)
	const [shortDescriptionPl, setShortDescriptionPl] = useState<string | null>(
		itemData.shortDescriptionPl,
	)
	const [shortDescriptionRu, setShortDescriptionRu] = useState<string | null>(
		itemData.shortDescriptionRu,
	)

	const [descriptionUa, setDescriptionUa] = useState<string | null>(
		itemData.descriptionUa,
	)
	const [descriptionEn, setDescriptionEn] = useState<string | null>(
		itemData.descriptionEn,
	)
	const [descriptionPl, setDescriptionPl] = useState<string | null>(
		itemData.descriptionPl,
	)
	const [descriptionRu, setDescriptionRu] = useState<string | null>(
		itemData.descriptionRu,
	)

	const [instagramUrl, setInstagramUrl] = useState<string | null>(
		itemData.instagramUrl || null,
	)
	const [facebookUrl, setFacebookUrl] = useState<string | null>(
		itemData.facebookUrl || null,
	)
	const [tiktokUrl, setTiktokUrl] = useState<string | null>(
		itemData.tiktokUrl || null,
	)
	const [linkedinUrl, setLinkedinUrl] = useState<string | null>(
		itemData.linkedinUrl || null,
	)
	const [youtubeUrl, setYoutubeUrl] = useState<string | null>(
		itemData.youtubeUrl || null,
	)
	const [telegramUrl, setTelegramUrl] = useState<string | null>(
		itemData.telegramUrl || null,
	)

	const mutation = useMutation({
		mutationFn: partnersInfoApi.update,
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [QUERY_KEYS.PARTNERS, itemData.partnerId, 'info'],
			})
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

		const dto: UpdatePartnerInfoDto = {
			id: itemData.id,

			...(shortDescriptionUa ? { shortDescriptionUa } : {}),
			...(shortDescriptionEn ? { shortDescriptionEn } : {}),
			...(shortDescriptionPl ? { shortDescriptionPl } : {}),
			...(shortDescriptionRu ? { shortDescriptionRu } : {}),

			...(descriptionUa ? { descriptionUa } : {}),
			...(descriptionEn ? { descriptionEn } : {}),
			...(descriptionPl ? { descriptionPl } : {}),
			...(descriptionRu ? { descriptionRu } : {}),

			...(instagramUrl ? { instagramUrl } : {}),
			...(facebookUrl ? { facebookUrl } : {}),
			...(tiktokUrl ? { tiktokUrl } : {}),
			...(linkedinUrl ? { linkedinUrl } : {}),
			...(youtubeUrl ? { youtubeUrl } : {}),
			...(telegramUrl ? { telegramUrl } : {}),
		}

		mutation.mutate(dto)
	}
	return (
		<ModalPortal>
			<div className={c.form__container}>
				<div className={c.form}>
					<FormTitle title="Zmień dane partnera" />
					<TextInput
						inputTitle="krótki opis UA (500 symboli)"
						value={shortDescriptionUa}
						onChange={setShortDescriptionUa}
					/>
					<FormTextarea
						inputTitle="pełny opis UA"
						value={descriptionUa}
						onChange={setDescriptionUa}
					/>

					<TextInput
						inputTitle="krótki opis EN (500 symboli)"
						value={shortDescriptionEn}
						onChange={setShortDescriptionEn}
					/>
					<FormTextarea
						inputTitle="pełny opis EN"
						value={descriptionEn}
						onChange={setDescriptionEn}
					/>

					<TextInput
						inputTitle="krótki opis PL (500 symboli)"
						value={shortDescriptionPl}
						onChange={setShortDescriptionPl}
					/>
					<FormTextarea
						inputTitle="pełny opis PL"
						value={descriptionPl}
						onChange={setDescriptionPl}
					/>

					<TextInput
						inputTitle="krótki opis RU (500 symboli)"
						value={shortDescriptionRu}
						onChange={setShortDescriptionRu}
					/>
					<FormTextarea
						inputTitle="pełny opis RU"
						value={descriptionRu}
						onChange={setDescriptionRu}
					/>

					<TextInput
						inputTitle="Instagram URL"
						value={instagramUrl}
						onChange={setInstagramUrl}
					/>

					<TextInput
						inputTitle="Facebook URL"
						value={facebookUrl}
						onChange={setFacebookUrl}
					/>

					<TextInput
						inputTitle="TikTok URL"
						value={tiktokUrl}
						onChange={setTiktokUrl}
					/>

					<TextInput
						inputTitle="LinkedIn URL"
						value={linkedinUrl}
						onChange={setLinkedinUrl}
					/>

					<TextInput
						inputTitle="YouTube URL"
						value={youtubeUrl}
						onChange={setYoutubeUrl}
					/>

					<TextInput
						inputTitle="Telegram URL"
						value={telegramUrl}
						onChange={setTelegramUrl}
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

export default ChangePartnerInfoForm
