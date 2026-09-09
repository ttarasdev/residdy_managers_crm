/** Lists and details cannot collide even when a page number equals an entity ID. */
export function createEntityQueryKeys(entity: string) {
    return {
        all: [entity] as const,
        lists: [entity, 'list'] as const,

        list: (query: object = {}) => [entity, 'list', query] as const,

        details: [entity, 'detail'] as const,

        detail: (id: number) => [entity, 'detail', id] as const,
    }
}
