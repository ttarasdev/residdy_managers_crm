import { ResourcePage } from '@/features/crm/components/ResourcePage'

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    return <ResourcePage resource="case-reminders" id={id} />
}
