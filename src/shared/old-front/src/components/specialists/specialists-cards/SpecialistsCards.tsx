'use client'

import { Specialist } from '@/api/specialists/specialists/specialists.types'
import c from './SpecialistsCards.module.scss'
import { useRouter } from 'next/navigation'
import { PAGE_PATHS } from '@/shared/types-enums/paths'
import PageBlockCard from '@/components/page-block-components/page-block-cards/page-block-card/PageBlockCard'

interface Props {
	data: Specialist[]
}

const SpecialistsCards: React.FC<Props> = ({ data }) => {
	const router = useRouter()

	const openItemPage = (id: number) => {
		router.push(PAGE_PATHS.SPECIALISTS + '/' + id)
	}

	return (
		<div className={c.cards}>
			{data.map((i) => (
				<div key={i.id} className={c.cards__item}>
					<PageBlockCard
						id={i.id}
						variantId={i.avatarId}
						title={`${i.name ? i.name : 'name'} ${
							i.surname ? i.surname : 'surname'
						}`}
						subtitle={i.email}
						infoBlock={i.phone ? i.phone : 'no number'}
						info={i.location ? i.location : 'no location'}
						leftStatus={i.status}
						leftStatusIcon="/block_icons/settings_orange.svg"
						rightStatus={i.rating ? i.rating.toString() : '0'}
						rightStatusIcon="/block_icons/person_green.svg"
						openItemPage={openItemPage}
					/>
				</div>
			))}
		</div>
	)
}

export default SpecialistsCards
