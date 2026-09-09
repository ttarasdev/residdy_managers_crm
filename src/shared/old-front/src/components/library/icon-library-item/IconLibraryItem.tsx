'use client'

import { PublicAsset } from '@/api/media/public-assets/public-assets.types'
import c from './IconLibraryItem.module.scss'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useConfirm } from '@/shared/hooks/useConfirm'
import { publicAssetsApi } from '@/api/media/public-assets/public-assets.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { PUBLIC_BUCKETS } from '@/shared/types-enums/buckets'
import { ConfirmationModal } from '@/components/features-components/confirmation-modal/ConfirmationModal'
import { IconContainer } from '../icon-container/IconContainer'

interface Props {
	item: PublicAsset
	page: number
}

const IconLibraryItem: React.FC<Props> = ({ item, page }) => {
	const [isPopupOpened, setIsPopupOpened] = useState(false)
	const qc = useQueryClient()

	const { isOpen, open, confirm, close, isPending } = useConfirm<number>()

	const deleteItem = () => {
		setIsPopupOpened(false)
		open({
			payload: item.id,
			run: publicAssetsApi.remove,
			invalidateKeys: [
				[QUERY_KEYS.MEDIA_ICON_KEY, page, PUBLIC_BUCKETS.ICONS],
			],
		})
	}

	const togglePopularMutation = useMutation({
		mutationFn: publicAssetsApi.togglePopular,
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [
					QUERY_KEYS.MEDIA_ICON_KEY,
					page,
					PUBLIC_BUCKETS.ICONS,
				],
			})
			setIsPopupOpened(false)
		},
	})

	return (
		<div
			onClick={() => setIsPopupOpened(true)}
			className={`${c.item} ${item.isPopular ? c.active : ''}`}
		>
			<IconContainer item={item} />
			{isPopupOpened && (
				<div
					className={c.item__popup}
					onClick={(e) => e.stopPropagation()}
				>
					<button className={c.item__button} onClick={deleteItem}>
						wyrzuć
					</button>
					<button
						onClick={() => togglePopularMutation.mutate(item.id)}
						className={c.item__button}
					>
						{item.isPopular ? 'unlike' : 'like'}
					</button>
					<button
						onClick={() => setIsPopupOpened(false)}
						className={c.item__button}
					>
						skasować
					</button>
				</div>
			)}
			<ConfirmationModal
				open={isOpen}
				title="Usuwanie"
				message="Czy na pewno chcesz usunąć tą ikonkę?"
				confirmText="Usuń"
				cancelText="Anuluj"
				onCancel={close}
				onConfirm={confirm}
				isPending={isPending}
			/>
		</div>
	)
}

export default IconLibraryItem
