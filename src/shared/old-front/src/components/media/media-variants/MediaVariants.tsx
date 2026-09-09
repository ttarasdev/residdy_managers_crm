'use client'

import {
	CompanyVariant,
	CompanyVariantJoined,
} from '@/api/media/company-variants/company-variants.types'
import c from './MediaVariants.module.scss'
import Image from 'next/image'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useConfirm } from '@/shared/hooks/useConfirm'
import { companyVariantsApi } from '@/api/media/company-variants/company-variants.api'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { JwtCompanyVariantImage } from '@/components/features-components/img-containers/JwtCompanyVariantImage'
import { ConfirmationModal } from '@/components/features-components/confirmation-modal/ConfirmationModal'
import { VariantSize } from '@/shared/types-enums/media'
import { PRIVATE_BUCKETS } from '@/shared/types-enums/buckets'

interface Props {
	items: CompanyVariant[]
	bucket: PRIVATE_BUCKETS
	page: number
}

const MediaVariants: React.FC<Props> = ({ items, bucket, page }) => {
	const [isPopupOpened, setIsPopupOpened] = useState(false)
	const [activeItemId, setActiveItemId] = useState<number | null>(null)
	const qc = useQueryClient()

	const { isOpen, open, confirm, close, isPending } = useConfirm<number>()

	const deleteItem = (id: number) => {
		setIsPopupOpened(false)
		open({
			payload: id,
			run: companyVariantsApi.remove,
			invalidateKeys: [[QUERY_KEYS.MEDIA_VARIANTS_KEY, bucket]],
		})
	}

	const toggleItem = (id: number) => {
		setActiveItemId(id)
		setIsPopupOpened(!isPopupOpened)
	}

	const togglePopularMutation = useMutation({
		mutationFn: companyVariantsApi.togglePopular,
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [QUERY_KEYS.MEDIA_VARIANTS_KEY, bucket, page],
			})
		},
	})

	const togglePopular = (id: number) => {
		togglePopularMutation.mutate(id)
		setIsPopupOpened(false)
	}

	return (
		<div className={c.variants}>
			{items.map((i) => (
				<div
					key={i.id}
					className={`${c.variants__item} ${
						i.isPopular ? c.isPopular : ''
					}`}
					onClick={() => toggleItem(i.id)}
				>
					<JwtCompanyVariantImage
						variantId={i.id}
						alt={'variant'}
						size={VariantSize.MEDIUM}
						fill
						style={{ objectFit: 'cover' }}
					/>

					<div
						className={`${c.variants__like} ${
							i.isPopular ? c.isPopular : ''
						}`}
					>
						<Image
							src="/block_icons/like_white.svg"
							width={20}
							height={20}
							alt="+"
						/>
					</div>
				</div>
			))}

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
					className={c.variants__popup}
					onClick={() => setIsPopupOpened(false)}
				>
					<button
						onClick={(e) => {
							e.stopPropagation()
							deleteItem(activeItemId)
						}}
						className={c.variants__button}
					>
						usunąc
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation()
							togglePopular(activeItemId)
						}}
						className={c.variants__button}
					>
						like
					</button>
				</div>
			)}
		</div>
	)
}

export default MediaVariants
