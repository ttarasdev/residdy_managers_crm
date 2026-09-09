'use client'

import c from './EmployeesCards.module.scss'
import PageBlockCard from '@/components/page-block-components/page-block-cards/page-block-card/PageBlockCard'
import { useState } from 'react'
import EmployeesUpdateForm from '../employees-update-form/EmployeesUpdateForm'
import { ConfirmationModal } from '@/components/features-components/confirmation-modal/ConfirmationModal'
import { useConfirm } from '@/shared/hooks/useConfirm'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Manager, ManagerStatus } from '@/api/manager-api/manager/manager.types'
import { managerApi } from '@/api/manager-api/manager/manager.api'

interface Props {
	data: Manager[]
}

const EmployeesCards: React.FC<Props> = ({ data }) => {
	const [isChangeFormOpened, setIsChangeFormOpened] = useState(false)
	const [activeItem, setActiveItem] = useState<Manager | null>(null)

	const qc = useQueryClient()

	const changeActive = (id: number) => {
		setActiveItem(data.filter((i) => id === i.id)[0])
		setIsChangeFormOpened(true)
	}

	const { isOpen, open, confirm, close, isPending } = useConfirm<number>()

	const deleteManager = (id: number) => {
		open({
			payload: id,
			run: managerApi.deleteById,
			invalidateKeys: [[QUERY_KEYS.MANAGERS]],
		})
	}

	const banMutation = useMutation({
		mutationFn: managerApi.ban,
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [QUERY_KEYS.MANAGERS],
			})
		},
	})

	const banManager = (managerId: number) => {
		banMutation.mutate({ managerId })
	}

	return (
		<div className={c.cards}>
			{data.map((i) => (
				<div key={i.id} className={c.cards__item}>
					<PageBlockCard
						id={i.id}
						variantId={i.avatarId}
						title={`${i.name} ${i.surname}`}
						subtitle={i.email}
						infoBlock={i.phone}
						info={i.location}
						leftStatus={i.status}
						leftStatusIcon="/block_icons/settings_orange.svg"
						rightStatus={i.position}
						rightStatusIcon="/block_icons/person_green.svg"
						toggleFirstButton={changeActive}
						toggleSecondButton={deleteManager}
						thirdButtonTitle={
							i.status === ManagerStatus.BLOCKED
								? 'rozblokować'
								: 'zablokuj'
						}
						toggleThirdButton={banManager}
						secondButtonTitle="usuń"
						firstButtonTitle="zmień"
					/>
				</div>
			))}
			{isChangeFormOpened && activeItem && (
				<EmployeesUpdateForm
					onClose={() => setIsChangeFormOpened(false)}
					data={activeItem}
				/>
			)}
			<ConfirmationModal
				open={isOpen}
				title="Usuwanie"
				message="Czy na pewno chcesz usunąc menedżera?"
				confirmText="Usuń"
				cancelText="Anuluj"
				onCancel={close}
				onConfirm={confirm}
				isPending={isPending}
			/>
		</div>
	)
}

export default EmployeesCards
