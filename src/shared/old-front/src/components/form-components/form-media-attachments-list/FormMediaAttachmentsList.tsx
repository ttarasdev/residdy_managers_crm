'use client'

import { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import c from './FormMediaAttachmentsList.module.scss'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import PageBlockChangePage from '@/components/page-block-components/page-block-change-page/PageBlockChangePage'
import { formatDate } from '@/shared/lib/date'
import { AttachmentRef } from '@/api/mails-api/mail-jobs/mail-jobs.types'
import { PRIVATE_BUCKETS } from '@/shared/types-enums/buckets'
import { companyAssetsApi } from '@/api/media/company-assets/company-assets.api'
import { CompanyAsset } from '@/api/media/company-assets/company-assets.types'

interface Props {
	bucket: PRIVATE_BUCKETS
	attachments: AttachmentRef[] | null
	setAttachments: React.Dispatch<React.SetStateAction<AttachmentRef[] | null>>
	title?: string
}

const FormMediaAttachmentsList: React.FC<Props> = ({
	bucket,
	attachments,
	setAttachments,
	title = 'wybierz pliki',
}) => {
	const [page, setPage] = useState(1)
	const limit = 40

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.MEDIA_ICON_KEY, bucket, page],
		queryFn: () => companyAssetsApi.list({ bucket, page, limit }),
		placeholderData: keepPreviousData,
		staleTime: 60_000,
	})

	const active = attachments ?? []

	const isActive = (assetId: number) =>
		active.some((a) => a.mediaAssetId === assetId)

	const toggle = (asset: CompanyAsset) => {
		setAttachments((prev) => {
			const arr = prev ?? []
			const idx = arr.findIndex((x) => x.mediaAssetId === asset.id)

			if (idx >= 0) {
				const next = [...arr.slice(0, idx), ...arr.slice(idx + 1)]
				return next.length ? next : null
			}

			return [
				...arr,
				{ mediaAssetId: asset.id, filename: asset.originalName },
			]
		})
	}

	if (isLoading)
		return (
			<div className={c.items__container}>
				<PageBlockLoadingData />
			</div>
		)

	if (error || !data)
		return (
			<div className={c.items__container}>
				<PageBlockNoData />
			</div>
		)

	const maxPage = Math.ceil(data.total / limit)

	return (
		<div className={c.items__container}>
			{title}
			<div className={c.items}>
				{data.items.map((i: CompanyAsset) => (
					<div
						key={i.id}
						onClick={() => toggle(i)}
						className={`${c.item} ${
							isActive(i.id) ? c.active : ''
						}`}
					>
						<div className={c.item__info}>
							<p className={c.item__title}>{i.originalName}</p>
							<p className={c.item__subtitle}>
								{formatDate(i.createdAt)}
							</p>
						</div>
					</div>
				))}
			</div>

			<PageBlockChangePage
				page={page}
				setPage={setPage}
				maxPage={maxPage}
			/>
		</div>
	)
}

export default FormMediaAttachmentsList
