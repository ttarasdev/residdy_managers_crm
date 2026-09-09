'use client'

import React from 'react'
import c from './confirmationModal.module.scss'
import FormFooter from '../../form-components/form-footer/FormFooter'
import { ModalPortal } from '../../form-components/modal-portal/ModalPortal'

type Props = {
	open: boolean
	title?: string
	message: string
	confirmText?: string
	cancelText?: string
	onConfirm: () => void
	onCancel: () => void
	isPending?: boolean
}

export const ConfirmationModal: React.FC<Props> = ({
	open,
	title,
	message,
	confirmText = 'Potwierdź',
	cancelText = 'Anuluj',
	onConfirm,
	onCancel,
	isPending = false,
}) => {
	if (!open) return null

	return (
		<ModalPortal>
			<div className={c.modal__container}>
				<div className={c.modal}>
					{title && <h3 className={c.modal__title}>{title}</h3>}
					<p className={c.modal__subtitle}>{message}</p>

					<FormFooter
						title={confirmText}
						onCancel={onCancel}
						onSubmit={onConfirm}
						isPending={isPending}
					/>
				</div>
			</div>
		</ModalPortal>
	)
}
