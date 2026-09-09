'use client'

import { ModalPortal } from '@/components/form-components/modal-portal/ModalPortal'
import c from './GdocsAddForm.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import FormTitle from '@/components/form-components/form-title/FormTitle'
import TextInput from '@/components/form-components/text-input/TextInput'
import FormIconsList from '@/components/form-components/form-icons-list/FormIconsList'
import FormFooter from '@/components/form-components/form-footer/FormFooter'
import { PUBLIC_BUCKETS } from '@/shared/types-enums/buckets'
import FormGdocVarsList from '@/components/form-components/form-gdoc-vars-list/FormGdocVarsList'
import MediaFileInput from '@/components/form-components/media-file-input/MediaFileInput'
import { gdocsApi } from '@/api/gdocs-api/gdocs/gdocs.api'
import { GdocTemplateStatus } from '@/api/gdocs-api/gdocs/gdocs.types'
import FormGdocTypesList from '@/components/form-components/form-gdoc-types-list/FormGdocTypesList'

interface Props {
	onClose: () => void
}

const GdocsAddForm: React.FC<Props> = ({ onClose }) => {
	const qc = useQueryClient()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const [titleUA, setTitleUA] = useState<string | null>(null)
	const [titlePL, setTitlePL] = useState<string | null>(null)
	const [titleEN, setTitleEN] = useState<string | null>(null)
	const [titleRU, setTitleRU] = useState<string | null>(null)
	const [iconId, setIconId] = useState<number | null>(null)
	const [file, setFile] = useState<File | null>(null)
	const [gDocTypeId, setGdocTypeId] = useState<number | null>(null)
	const [variableIds, setVariableIds] = useState<number[]>([])

	const toggleVariable = (id: number) => {
		setVariableIds((prev) =>
			prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
		)
	}

	const mutation = useMutation({
		mutationFn: gdocsApi.create,
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [QUERY_KEYS.GDOCS] })
			setErrorMessage(null)
			onClose()
		},
		onError: (error: any) => {
			const msg =
				error?.data?.message ||
				error?.message ||
				'Wystąpił błąd podczas tworzenia dokumentu'
			setErrorMessage(Array.isArray(msg) ? msg.join(', ') : String(msg))
		},
	})

	const submit = (e: React.FormEvent) => {
		e.preventDefault()
		setErrorMessage(null)

		if (
			iconId &&
			titleUA?.trim() &&
			titlePL?.trim() &&
			titleEN?.trim() &&
			titleRU?.trim() &&
			file &&
			gDocTypeId
		) {
			mutation.mutate({
				titleUA: titleUA.trim(),
				titlePL: titlePL.trim(),
				titleEN: titleEN.trim(),
				titleRU: titleRU.trim(),
				iconId,
				originalFileName: file.name,
				file,
				gDocTypeId,
				status: GdocTemplateStatus.INACTIVE,
				variableIds,
			})
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
					<FormGdocVarsList
						toggleItem={toggleVariable}
						activeItems={variableIds}
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

export default GdocsAddForm
