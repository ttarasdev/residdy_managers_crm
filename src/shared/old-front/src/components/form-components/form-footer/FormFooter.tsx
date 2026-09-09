'use client'

import c from './FormFooter.module.scss'

interface Props {
	title?: string
	onCancel?: () => void
	onSubmit?: (e: React.FormEvent) => void
	isPending?: boolean
}

const FormFooter: React.FC<Props> = ({
	title = 'Wyślij',
	onCancel,
	onSubmit,
	isPending,
}) => {
	return (
		<div className={c.buttons}>
			<button
				type="button"
				className={c.buttons__cancel}
				onClick={onCancel}
			>
				Anuluj
			</button>
			<button
				disabled={isPending}
				className={c.buttons__submit}
				onClick={onSubmit}
			>
				{isPending ? 'Wysyłanie...' : title}
			</button>
		</div>
	)
}

export default FormFooter
