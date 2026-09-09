'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import c from './CaseInstructionItemBlock.module.scss'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { caseInstructionsApi } from '@/api/cases-api/case-instructions/case-instructions.api'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import ItemBlockTop from '@/components/page-block-components/item-page/item-block-top/ItemBlockTop'
import { useState } from 'react'
import ItemBlockHeader from '@/components/page-block-components/item-page/item-block-header/ItemBlockHeader'
import { formatDate } from '@/shared/lib/date'
import InstructionBlocksBlock from './instruction-blocks-block/InstructionBlocksBlock'
import InstructionView from './instruction-view/InstructionView'
import CaseInstructionChangeForm from '../case-instruction-change-form/CaseInstructionChangeForm'

interface Props {
	id: number
}

const CaseInstructionItemBlock: React.FC<Props> = ({ id }) => {
	const [isChangeFormOpened, setIsChangeFormOpened] = useState(false)
	const [instructionPopup, setInstructionPopup] = useState(false)

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.CASE_INSTRUCTIONS_KEY, id],
		queryFn: () => caseInstructionsApi.getOne(id),
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
				title={data.title}
				subtitle={data.description}
				variantId={data.headerIconId}
				secondButtonTitle="zobacz"
				setIsSecondFormOpened={() => setInstructionPopup(true)}
				setIsFormOpened={() => setIsChangeFormOpened(true)}
			/>
			<ItemBlockHeader
				id={data.id}
				lan={data.lan}
				status={data.status.toString()}
				isPopular={data.isPopular}
				createdAt={formatDate(data.createdAt)}
			/>
			<div className={c.block__row}>
				<InstructionBlocksBlock data={data} />
			</div>
			{instructionPopup && (
				<InstructionView
					data={data}
					onClose={() => setInstructionPopup(false)}
				/>
			)}
			{isChangeFormOpened && (
				<CaseInstructionChangeForm
					data={data}
					onClose={() => setIsChangeFormOpened(false)}
				/>
			)}
		</div>
	)
}

export default CaseInstructionItemBlock
