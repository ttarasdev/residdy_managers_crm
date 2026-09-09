'use client'

import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import c from './MailNewsLetterAddForm.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { MailAccount } from '@/api/mails-api/mail-accounts/mail-accounts.types'
import {
	AttachmentRef,
	AudienceFilters,
	InlineImageRef,
} from '@/api/mails-api/mail-jobs/mail-jobs.types'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import FormSelect from '@/components/form-components/form-select/FormSelect'
import { mailJobsApi } from '@/api/mails-api/mail-jobs/mail-jobs.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import {
	lansSelectData,
	mailAccountsSelectData,
} from '@/shared/constants/form-select-data'
import FormTextarea from '@/components/form-components/form-textarea/FormTextarea'
import { Languages } from '@/shared/types-enums/lans'
import { getMailHtmlTemplatesByLan } from '@/shared/constants/mail-html-templates'
import FormUserAudience from '@/components/form-components/form-user-audience/FormUserAudience'
import FormMediaAttachmentsList from '@/components/form-components/form-media-attachments-list/FormMediaAttachmentsList'
import FormVariantsInlineImagesListMulti from '@/components/form-components/form-variants-list/FormVariantsInlineImagesList'
import { PRIVATE_BUCKETS } from '@/shared/types-enums/buckets'
import { VariantSize } from '@/shared/types-enums/media'

interface Props {
	onClose: () => void
}

const MailNewsletterAddForm: React.FC<Props> = ({ onClose }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [title, setTitle] = useState<string | null>(null)
	const [account, setAccount] = useState<MailAccount | null>(null)
	const [subject, setSubject] = useState<string | null>(null)
	const [text, setText] = useState<string | null>(null)
	const [html, setHtml] = useState<string | null>(null)
	const [audience, setAudience] = useState<AudienceFilters | null>(null)
	const [attachments, setAttachments] = useState<AttachmentRef[] | null>(null)
	const [inlineImages, setInlineImages] = useState<InlineImageRef[] | null>(
		null,
	)
	const [lan, setLan] = useState<Languages | null>(null)

	const mutation = useMutation({
		mutationFn: mailJobsApi.create,
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [QUERY_KEYS.MAIL_JOBS] })
			setErrorMessage(null)
			onClose()
		},
		onError: (error: any) => {
			const msg =
				error?.data?.message ||
				error?.message ||
				'Wystąpił błąd podczas tworzenia'
			setErrorMessage(msg)
		},
	})

	const submit = (e: React.FormEvent) => {
		e.preventDefault()
		setErrorMessage(null)

		if (title && text && account && subject && html && audience) {
			const payload = {
				title,
				text,
				account,
				subject,
				html,
				audience,
				...(attachments != null ? { attachments } : {}),
				...(inlineImages != null ? { inlineImages } : {}),
			}

			return mutation.mutate(payload)
		} else {
			setErrorMessage('wypełnij wszystko')
		}
	}

	return (
		<ModalPortal>
			<div className={c.form__container}>
				<div className={c.form}>
					<FormTitle title="Dodaj newslettera" />
					<TextInput
						inputTitle="nazwa"
						value={title}
						onChange={setTitle}
					/>
					<TextInput
						inputTitle="tytuł"
						value={subject}
						onChange={setSubject}
					/>
					<FormSelect
						item={account}
						onChange={setAccount}
						options={mailAccountsSelectData}
						selectTitle="wybierz pocztę"
					/>
					<FormSelect
						item={lan}
						onChange={setLan}
						options={lansSelectData}
						selectTitle="wybierz język"
					/>
					<FormUserAudience
						audience={audience}
						onChange={setAudience}
					/>
					{lan && (
						<FormSelect
							item={html}
							onChange={setHtml}
							options={getMailHtmlTemplatesByLan(lan)}
							selectTitle="wybierz typ szablonu (będzie pod wiadomnością)"
						/>
					)}
					<FormTextarea
						inputTitle="tekst"
						value={text}
						onChange={setText}
					/>
					<FormMediaAttachmentsList
						bucket={PRIVATE_BUCKETS.MAIL_ATTACHMENTS}
						attachments={attachments}
						setAttachments={setAttachments}
						title="wybierz pliki (opcjonalnie)"
					/>
					<FormVariantsInlineImagesListMulti
						bucket={PRIVATE_BUCKETS.MAIL_INLINE_IMAGES}
						queryKeys={[QUERY_KEYS.MEDIA_VARIANTS_KEY]}
						cid="logo_cid"
						assetSizeToUse={VariantSize.MEDIUM}
						previewSize={VariantSize.MEDIUM}
						inlineImages={inlineImages}
						setInlineImages={setInlineImages}
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

export default MailNewsletterAddForm
