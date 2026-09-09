import type { RequestOptions } from '../../api/http.types'

export interface FieldSchema {
    name: string
    kind:
        | 'string'
        | 'number'
        | 'boolean'
        | 'enum'
        | 'object'
        | 'array'
        | 'file'
        | 'json'
    optional?: boolean
    nullable?: boolean
    choices?: (string | number)[]
    fields?: FieldSchema[]
    item?: FieldSchema
}

export interface Operation {
    id: string
    resource: string
    method: string
    verb: string
    roles: readonly string[]
    args: FieldSchema[]
    execute: (args: unknown[], options?: RequestOptions) => Promise<unknown>
}

export interface Resource {
    id: string
    title: string
    description: string
    group: string
    path: string
    roles: readonly string[]
    columns: string[]
    hidden?: boolean
}
