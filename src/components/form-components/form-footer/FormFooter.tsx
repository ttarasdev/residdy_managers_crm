import c from './FormFooter.module.scss'

export default function FormFooter({
    title = 'Wyślij',
    onCancel,
    isPending = false,
}: {
    title?: string
    onCancel?: () => void
    isPending?: boolean
}) {
    return (
        <div className={c.buttons}>
            {onCancel && (
                <button
                    type="button"
                    disabled={isPending}
                    className={c.buttons__cancel}
                    onClick={onCancel}
                >
                    Anuluj
                </button>
            )}
            <button
                type="submit"
                disabled={isPending}
                className={c.buttons__submit}
            >
                {isPending ? 'Wysyłanie...' : title}
            </button>
        </div>
    )
}
