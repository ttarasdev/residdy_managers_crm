'use client'

import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import c from './GdocsChangeForm.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormIconsList from '@/components/form-components/form-icons-list/FormIconsList'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import { PUBLIC_BUCKETS } from '@/shared/types-enums/buckets'
import FormGdocTypesList from '@/components/form-components/form-gdoc-types-list/FormGdocTypesList'
import MediaFileInput from '@/components/form-components/media-file-input/MediaFileInput'
import { gdocsApi } from '@/api/gdocs-api/gdocs/gdocs.api'
import { Gdoc } from '@/api/gdocs-api/gdocs/gdocs.types'

interface Props {
	onClose: () => void
	gdoc: Gdoc
}

const GdocsChangeForm: React.FC<Props> = ({ onClose, gdoc }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [titlePL, setTitlePL] = useState<string | null>(gdoc.titlePL)
	const [titleUA, setTitleUA] = useState<string | null>(gdoc.titleUA)
	const [titleEN, setTitleEN] = useState<string | null>(gdoc.titleEN)
	const [titleRU, setTitleRU] = useState<string | null>(gdoc.titleRU)
	const [iconId, setIconId] = useState<number | null>(gdoc.iconId)
	const [file, setFile] = useState<File | null>(null)
	const [gDocTypeId, setGdocTypeId] = useState<number | null>(gdoc.gDocTypeId)

	const mutation = useMutation({
		mutationFn: gdocsApi.update,
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

		if (iconId && titleUA && titlePL && titleEN && titleRU && gDocTypeId) {
			const payload = {
				id: gdoc.id,
				dto: {
					titleUA: titleUA.trim(),
					titlePL: titlePL.trim(),
					titleEN: titleEN.trim(),
					titleRU: titleRU.trim(),
					iconId,
					originalFileName: titleEN,
					...(file ? { file } : {}),
					gDocTypeId,
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
					<FormTitle title="Dodaj plik do generowania" />
					<MediaFileInput setFile={setFile} />
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
					<FormGdocTypesList
						toggleItem={setGdocTypeId}
						activeItemId={gDocTypeId}
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

export default GdocsChangeForm
