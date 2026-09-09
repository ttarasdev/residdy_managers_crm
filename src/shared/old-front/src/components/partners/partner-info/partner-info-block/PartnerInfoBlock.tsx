'use client'

import { useState } from 'react'
import c from './PartnerInfoBlock.module.scss'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { partnersInfoApi } from '@/api/partners-api/partners-info/partners-info.api'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import ItemBlockTop from '@/components/page-block-components/item-page/item-block-top/ItemBlockTop'
import ChangePartnerInfoForm from '../change-partner-info-form/ChangePartnerInfoForm'
import ChangePartnerPhotoForm from '../change-partner-photo-form/ChangePartnerPhotoForm'
import AddPartnerInfoForm from '../add-partner-info-form/AddPartnerInfoForm'

interface Props {
	id: number
}

const PartnerInfoBlock: React.FC<Props> = ({ id }) => {
	const [isChangeFormOpened, setIsChangeFormOpened] = useState(false)
	const [isChangePhotoFormOpened, setIsChangePhotoFormOpened] =
		useState(false)
	const [isAddFormOpened, setIsAddFormOpened] = useState(false)

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.PARTNERS, id, 'info'],
		queryFn: () => partnersInfoApi.getByPartnerId(id),
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
				<ItemBlockTop
					title={'Info'}
					subtitle={`partner ID:${id}`}
					setIsSecondFormOpened={() => setIsAddFormOpened(true)}
					secondButtonTitle="dodaj"
				/>
				{isAddFormOpened && (
					<AddPartnerInfoForm
						partnerId={id}
						onClose={() => setIsAddFormOpened(false)}
					/>
				)}
				<PageBlockNoData />
			</div>
		)

	return (
		<div className={c.block}>
			<ItemBlockTop
				title={'Info'}
				subtitle={`partner ID:${id}`}
				companyAssetId={data.mainPhotoId}
				setIsIconFormOpened={() => setIsChangePhotoFormOpened(true)}
				setIsFormOpened={() => setIsChangeFormOpened(true)}
			/>
			{isChangeFormOpened && (
				<ChangePartnerInfoForm
					itemData={data}
					onClose={() => setIsChangeFormOpened(false)}
				/>
			)}
			{isChangePhotoFormOpened && (
				<ChangePartnerPhotoForm
					id={data.id}
					onClose={() => setIsChangePhotoFormOpened(false)}
				/>
			)}
		</div>
	)
}

export default PartnerInfoBlock
