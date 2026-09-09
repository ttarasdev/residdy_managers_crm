import type { RequestOptions } from '../../api/http.types'
import { getOperation, normalizeRows } from './data'

/** Public detail endpoints omit inactive records and manager-only fields. */
export async function readResource(
    resource: string,
    id: number,
    options: RequestOptions = {},
) {
    const list = getOperation(resource, 'list')!

    if (resource === 'specialists') {
        const result = normalizeRows(
            await list.execute([{ id, limit: 1 }], options),
        )

        const record = result.rows.find((row) => row.id === id)

        if (!record) throw new Error('Nie znaleziono specjalisty')

        return record
    }

    if (resource === 'consultation-categories') {
        let page = 1

        while (true) {
            const result = normalizeRows(
                await list.execute([{ page, limit: 100 }], options),
            )

            const record = result.rows.find((row) => row.id === id)

            if (record) return record

            if (!result.rows.length || page * 100 >= result.total) break

            page++
        }

        throw new Error('Nie znaleziono kategorii')
    }

    return getOperation(resource, 'getById')!.execute([id], options)
}
