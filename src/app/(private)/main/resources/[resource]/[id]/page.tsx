import { notFound } from 'next/navigation'
import { getResource } from '@/features/crm/catalog'
import { getOperation } from '@/features/crm/data'
import { ResourcePage } from '@/features/crm/components/ResourcePage'

export default async function Page({
    params,
}: {
    params: Promise<{ resource: string; id: string }>
}) {
    const { resource, id } = await params

    if (!getResource(resource) || !getOperation(resource, 'getById')) notFound()

    return <ResourcePage resource={resource} id={id} />
}
