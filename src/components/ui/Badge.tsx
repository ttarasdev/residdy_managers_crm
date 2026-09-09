import { valueLabel } from '../../features/crm/labels'
import c from './ui.module.scss'

export function Badge({ value }: { value: unknown }) {
    return (
        <span
            className={c.badge}
            data-tone={
                ['active', 'published', 'done', 'approved', true].includes(
                    value as string | boolean,
                )
                    ? 'success'
                    : [
                            'blocked',
                            'rejected',
                            'cancelled',
                            'archived',
                            false,
                        ].includes(value as string | boolean)
                      ? 'muted'
                      : 'default'
            }
        >
            {valueLabel(value)}
        </span>
    )
}
