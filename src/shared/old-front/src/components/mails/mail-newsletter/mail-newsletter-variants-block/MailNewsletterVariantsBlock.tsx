'use client'

import { useState } from 'react'
import c from './MailNewsletterVariantsBlock.module.scss'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import PageBlockHeader from '@/components/page-block-components/page-block-header/PageBlockHeader'
import PageBlockChangePage from '@/components/page-block-components/page-block-change-page/PageBlockChangePage'
import MediaVariants from '@/components/media/media-variants/MediaVariants'
import { PRIVATE_BUCKETS } from '@/shared/types-enums/buckets'
import { companyVariantsApi } from '@/api/media/company-variants/company-variants.api'
import { MediaTypeEnum } from '@/shared/types-enums/media'
import CompanyAssetAddForm from '@/components/media/media-add-item-form/CompanyAssetAddForm'

const MailNewsletterVariantsBlock = () => {
	const [isFormOpened, setIsFormOpened] = useState(false)
	const [page, setPage] = useState<number>(1)
	const [bucket, setBucket] = useState<PRIVATE_BUCKETS>(
		PRIVATE_BUCKETS.MAIL_INLINE_IMAGES,
	)

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.MEDIA_VARIANTS_KEY, bucket, page],
		queryFn: () =>
			companyVariantsApi.list({
				bucket: bucket,
				page,
				limit: 9,
			}),
		placeholderData: keepPreviousData,
		staleTime: 60_000,
	})

	if (isLoading)
		return (
			<div className={c.block}>
				<PageBlockLoadingData />
			</div>
		)
	if (error || !data)
		return (
			<div className={c.block}>
				<PageBlockNoData />
			</div>
		)

	const maxPage = Math.ceil(data.total / 9)

	return (
		<div className={c.block}>
			<PageBlockHeader
				title="ikony do wysyłania"
				openAddForm={() => setIsFormOpened(true)}
			/>
			<MediaVariants items={data.items} bucket={bucket} page={page} />
			<PageBlockChangePage
				page={page}
				setPage={setPage}
				maxPage={maxPage}
			/>
			{isFormOpened && (
				<CompanyAssetAddForm
					bucket={bucket}
					onClose={() => setIsFormOpened(false)}
				/>
			)}
		</div>
	)
}

export default MailNewsletterVariantsBlock
