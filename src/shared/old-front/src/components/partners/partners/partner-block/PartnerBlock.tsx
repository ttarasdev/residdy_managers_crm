'use client'

import { useState } from 'react'
import c from './PartnerBlock.module.scss'
import { useConfirm } from '@/shared/hooks/useConfirm'
import { partnersApi } from '@/api/partners-api/partners/partners.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import { PAGE_PATHS } from '@/shared/types-enums/paths'
import ItemBlockTop from '@/components/page-block-components/item-page/item-block-top/ItemBlockTop'
import ItemBlockHeader from '@/components/page-block-components/item-page/item-block-header/ItemBlockHeader'
import ChangePartnerForm from '../change-partner-form/ChangePartnerForm'
import { ConfirmationModal } from '@/components/features-components/confirmation-modal/ConfirmationModal'
import { useRouter } from 'next/navigation'
import ChangePartnerLogoForm from '../change-partner-logo-form/ChangePartnerLogoForm'

interface Props {
	id: number
}

const PartnerBlock: React.FC<Props> = ({ id }) => {
	const [isChangeFormOpened, setIsChangeFormOpened] = useState(false)
	const [isChangeLogoFormOpened, setIsChangeLogoFormOpened] = useState(false)
	const router = useRouter()

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.PARTNERS, id],
		queryFn: () => partnersApi.getById(id),
		placeholderData: keepPreviousData,
		staleTime: 60_000,
	})

	const { isOpen, open, confirm, close, isPending } = useConfirm<number>()

	const deletePartner = () => {
		open({
			payload: id,
			run: partnersApi.remove,
			invalidateKeys: [[QUERY_KEYS.PARTNERS]],
			onSuccess: () => router.push(PAGE_PATHS.PARTNERS),
		})
	}

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

	return (
		<div className={c.block}>
			<ItemBlockTop
				title={data.companyName}
				iconId={data.logoId || undefined}
				secondButtonTitle="usuń"
				secondButtonIcon="/system_icons/delete"
				setIsSecondFormOpened={deletePartner}
				setIsIconFormOpened={() => setIsChangeLogoFormOpened(true)}
				setIsFormOpened={() => setIsChangeFormOpened(true)}
			/>
			<ItemBlockHeader id={data.id} status={data.status} />
			{isChangeFormOpened && (
				<ChangePartnerForm
					itemData={data}
					onClose={() => setIsChangeFormOpened(false)}
				/>
			)}
			{isChangeLogoFormOpened && (
				<ChangePartnerLogoForm
					id={data.id}
					onClose={() => setIsChangeLogoFormOpened(false)}
				/>
			)}
			<ConfirmationModal
				open={isOpen}
				title="Usuwanie"
				message="Czy na pewno chcesz usunąć tą publikację?"
				confirmText="Usuń"
				cancelText="Anuluj"
				onCancel={close}
				onConfirm={confirm}
				isPending={isPending}
			/>
		</div>
	)
}

export default PartnerBlock
