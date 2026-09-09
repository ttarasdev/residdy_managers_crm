'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import c from './PartnersBannersAddForm.module.scss'
import { useState } from 'react'
import { PartnerBannerType } from '@/api/partners-api/partner-banners/partners-banners.types'
import { partnersBannersApi } from '@/api/partners-api/partner-banners/partners-banners.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import MediaFileInput from '@/components/form-components/media-file-input/MediaFileInput'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import FormSelect from '@/components/form-components/form-select/FormSelect'
import { bannerSelectData } from '@/shared/constants/form-select-data'

interface Props {
	onClose: () => void
	partnerId: number
}

const PartnersBannersAddForm: React.FC<Props> = ({ onClose, partnerId }) => {
	const qc = useQueryClient()

	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [file, setFile] = useState<File | null>(null)
	const [type, setType] = useState<PartnerBannerType | null>(null)
	const [subtitlePl, setSubtitlePl] = useState<string | null>(null)
	const [subtitleUa, setSubtitleUa] = useState<string | null>(null)
	const [subtitleEn, setSubtitleEn] = useState<string | null>(null)
	const [subtitleRu, setSubtitleRu] = useState<string | null>(null)
	const [linkUrl, setLinkUrl] = useState<string | null>(null)

	const mutation = useMutation({
		mutationFn: partnersBannersApi.create,
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [QUERY_KEYS.PARTNER_BANNERS, partnerId],
			})
			setFile(null)
			setErrorMessage(null)
			setType(null)
			setSubtitleEn(null)
			setSubtitlePl(null)
			setSubtitleUa(null)
			setSubtitleRu(null)
			setLinkUrl(null)
			onClose()
		},
		onError: (error: any) => {
			console.error('Upload error:', error)
			const msg =
				error?.data?.message ||
				error?.message ||
				'Wystąpił błąd podczas tworzenia banera'
			setErrorMessage(msg)
		},
	})

	const submit = (e: React.FormEvent) => {
		if (
			!subtitleEn ||
			!subtitlePl ||
			!subtitleUa ||
			!subtitleRu ||
			!linkUrl ||
			!type ||
			!file
		) {
			setErrorMessage('wypełnij wszystko')
			return
		}
		e.preventDefault()
		setErrorMessage(null)
		mutation.mutate({
			dto: {
				partnerId,
				subtitleEn,
				subtitlePl,
				subtitleRu,
				subtitleUa,
				linkUrl,
				type,
			},
			file,
		})
	}

	return (
		<ModalPortal>
			<div className={c.form__container}>
				<div className={c.form}>
					<FormTitle title="Dodaj baner" />
					<TextInput
						inputTitle="nazwa PL"
						value={subtitlePl}
						onChange={setSubtitlePl}
					/>
					<TextInput
						inputTitle="nazwa En"
						value={subtitleEn}
						onChange={setSubtitleEn}
					/>
					<TextInput
						inputTitle="nazwa Ua"
						value={subtitleUa}
						onChange={setSubtitleUa}
					/>
					<TextInput
						inputTitle="nazwa Ru"
						value={subtitleRu}
						onChange={setSubtitleRu}
					/>
					<TextInput
						inputTitle="link"
						value={linkUrl}
						onChange={setLinkUrl}
					/>
					<MediaFileInput setFile={setFile} />
					{errorMessage && (
						<div className={c.form__error}>{errorMessage}</div>
					)}
					<FormSelect
						options={bannerSelectData}
						onChange={setType}
						selectTitle="rozmiar"
						item={type}
					/>
					<FormFooter
						onCancel={onClose}
						onSubmit={submit}
						isPending={mutation.isPending}
					/>
				</div>
			</div>
		</ModalPortal>
	)
}

export default PartnersBannersAddForm
