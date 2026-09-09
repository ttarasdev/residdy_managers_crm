'use client'

import { useState } from 'react'
import c from './CaseBlock.module.scss'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { casesApi } from '@/api/cases-api/cases/cases.api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import ItemBlockTop from '@/components/page-block-components/item-page/item-block-top/ItemBlockTop'
import ItemBlockHeader from '@/components/page-block-components/item-page/item-block-header/ItemBlockHeader'
import { formatDate } from '@/shared/lib/date'
import CaseEtapsBlock from '../case-etaps/case-etaps-block/CaseEtapsBlock'
import CaseTasksBlock from '../case-tasks/case-tasks-block/CaseTasksBlock'
import CaseChangeForm from '../case-change-form/CaseChangeForm'
import { ConfirmationModal } from '@/components/features-components/confirmation-modal/ConfirmationModal'
import { useConfirm } from '@/shared/hooks/useConfirm'
import { useRouter } from 'next/navigation'
import { PAGE_PATHS } from '@/shared/types-enums/paths'

interface Props {
	id: number
}

const CaseBlock: React.FC<Props> = ({ id }) => {
	const [isChangeFormOpened, setIsChangeFormOpened] = useState(false)
	const [activeStageId, setActiveStageId] = useState<number | null>(null)

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.CASES_KEY, id],
		queryFn: () => casesApi.getOne(id),
		placeholderData: keepPreviousData,
		staleTime: 60_000,
	})

	const { isOpen, open, confirm, close, isPending } = useConfirm<number>()
	const router = useRouter()

	const copyItem = () => {
		open({
			payload: id,
			run: casesApi.copy,
			onSuccess: () => {
				router.push(PAGE_PATHS.CASES)
			},
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
				title={data.title}
				subtitle={data.subtitle}
				icon={data.icon}
				setIsFormOpened={() => setIsChangeFormOpened(true)}
				setIsSecondFormOpened={copyItem}
				secondButtonTitle="kopiuj"
			/>
			<ItemBlockHeader
				id={data.id}
				lan={data.lan}
				status={data.status.toString()}
				isPopular={data.isPopular}
				createdAt={formatDate(data.createdAt)}
			/>
			<div className={c.block__row}>
				<CaseEtapsBlock
					caseData={data}
					setActiveStageId={setActiveStageId}
					activeStageId={activeStageId}
				/>
				<CaseTasksBlock data={data} activeStageId={activeStageId} />
			</div>
			{isChangeFormOpened && (
				<CaseChangeForm
					onClose={() => setIsChangeFormOpened(false)}
					itemData={data}
				/>
			)}
			<ConfirmationModal
				open={isOpen}
				title="Kopiowanie"
				message="Czy na pewno chcesz skopiować tą sprawę?"
				confirmText="Wyślij"
				cancelText="Anuluj"
				onCancel={close}
				onConfirm={confirm}
				isPending={isPending}
			/>
		</div>
	)
}

export default CaseBlock
