'use client'

import { useState } from 'react'
import c from './PromocodeBlock.module.scss'
import { useConfirm } from '@/shared/hooks/useConfirm'
import { promocodesApi } from '@/api/promo-api/promocodes/promocodes.api'
import { PAGE_PATHS } from '@/shared/types-enums/paths'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import { ConfirmationModal } from '@/components/features-components/confirmation-modal/ConfirmationModal'
import ItemBlockHeader from '@/components/page-block-components/item-page/item-block-header/ItemBlockHeader'
import ItemBlockTop from '@/components/page-block-components/item-page/item-block-top/ItemBlockTop'
import { formatDate } from '@/shared/lib/date'
import ItemBlockText from '@/components/page-block-components/item-page/item-block-text/ItemBlockText'
import { useRouter } from 'next/navigation'
import PromocodeChangeForm from '../promocode-change-form/PromocodeChangeForm'

interface Props {
	id: number
}

const PromocodeBlock: React.FC<Props> = ({ id }) => {
	const [isChangeFormOpened, setIsChangeFormOpened] = useState(false)

	const { isOpen, open, confirm, close, isPending } = useConfirm<number>()
	const router = useRouter()

	const deleteItem = () => {
		open({
			payload: id,
			run: promocodesApi.remove,
			onSuccess: () => router.push(PAGE_PATHS.PROMO),
		})
	}

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.PROMOCODES, id],
		queryFn: () => promocodesApi.getById(id),
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

	return (
		<div className={c.block}>
			<ItemBlockTop
				title={data.code}
				subtitle={data.notes || ''}
				secondButtonTitle="usuń"
				secondButtonIcon="/system_icons/delete"
				setIsSecondFormOpened={deleteItem}
				setIsFormOpened={() => setIsChangeFormOpened(true)}
			/>
			<ItemBlockHeader
				id={data.id}
				status={data.status.toString()}
				createdAt={formatDate(data.createdAt)}
			/>
			<div className={c.block__row}>
				<ItemBlockText text="wskazówki" />
			</div>
			{isChangeFormOpened && (
				<PromocodeChangeForm
					item={data}
					onClose={() => setIsChangeFormOpened(false)}
				/>
			)}
			<ConfirmationModal
				open={isOpen}
				title="Usuwanie"
				message="Czy na pewno chcesz usunąć ten promokod?"
				confirmText="Usuń"
				cancelText="Anuluj"
				onCancel={close}
				onConfirm={confirm}
				isPending={isPending}
			/>
		</div>
	)
}

export default PromocodeBlock
