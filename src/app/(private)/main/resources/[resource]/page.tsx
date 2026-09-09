import { notFound } from 'next/navigation'
import { getResource } from '@/features/crm/catalog'
import { ResourcePage } from '@/features/crm/components/ResourcePage'

export default async function Page({
    params,
}: {
    params: Promise<{ resource: string }>
}) {
    const { resource } = await params

    if (!getResource(resource)) notFound()

    return <ResourcePage resource={resource} />
}
