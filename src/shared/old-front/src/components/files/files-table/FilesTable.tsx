'use client'

import { ConfirmationModal } from '@/components/features-components/confirmation-modal/ConfirmationModal'
import c from './FilesTable.module.scss'
import { mapMediaAssetsToTableRows } from '@/shared/lib/dataToTableMap'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useConfirm } from '@/shared/hooks/useConfirm'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import PageBlockTable from '@/components/page-block-components/page-block-table/PageBlockTable'
import { CompanyAsset } from '@/api/media/company-assets/company-assets.types'
import { PRIVATE_BUCKETS } from '@/shared/types-enums/buckets'
import { companyAssetsApi } from '@/api/media/company-assets/company-assets.api'

interface Props {
	data: CompanyAsset[]
	bucket: PRIVATE_BUCKETS
	page: number
}

const FilesTable: React.FC<Props> = ({ data, bucket, page }) => {
	const [isPopupOpened, setIsPopupOpened] = useState(false)
	const [activeItemId, setActiveItemId] = useState<number | null>()
	const qc = useQueryClient()

	const { isOpen, open, confirm, close, isPending } = useConfirm<number>()

	const deleteItem = (id: number) => {
		setIsPopupOpened(false)
		open({
			payload: id,
			run: companyAssetsApi.remove,
			invalidateKeys: [[QUERY_KEYS.MEDIA_ICON_KEY, bucket]],
		})
	}

	const toggleItem = (id: number) => {
		setActiveItemId(id)
		setIsPopupOpened(!isPopupOpened)
	}

	const togglePopularMutation = useMutation({
		mutationFn: companyAssetsApi.togglePopular,
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [QUERY_KEYS.MEDIA_ICON_KEY, bucket, page],
			})
		},
	})

	const togglePopular = (id: number) => {
		togglePopularMutation.mutate(id)
		setIsPopupOpened(false)
	}

	const tableData = mapMediaAssetsToTableRows(data)

	return (
		<div className={c.assets}>
			<PageBlockTable toggleItem={toggleItem} data={tableData} />
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
			{isPopupOpened && activeItemId && (
				<div
					className={c.assets__popup}
					onClick={() => setIsPopupOpened(false)}
				>
					<button
						onClick={(e) => {
							e.stopPropagation()
							deleteItem(activeItemId)
						}}
						className={c.assets__button}
					>
						usunąc
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation()
							togglePopular(activeItemId)
						}}
						className={c.assets__button}
					>
						like
					</button>
				</div>
			)}
		</div>
	)
}

export default FilesTable
