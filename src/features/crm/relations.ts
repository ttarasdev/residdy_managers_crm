const relations: Record<string, string> = {
    signatureId: 'mail-signatures',
    logoAssetId: 'public-assets',
    planId: 'subscription-plans',
    subscriptionPlanId: 'subscription-plans',
    priceId: 'subscription-prices',
    nextPriceId: 'subscription-prices',
    userId: 'users',
    accountId: 'accounts',
    accountIds: 'accounts',
    ownerAccountId: 'accounts',
    specialistId: 'specialists',
    specialistConsultationId: 'specialist-consultations',
    partnerId: 'partners',
    companyId: 'partner-companies',
    categoryId: 'blog-categories',
    categoryIds: 'blog-categories',
    roleIds: 'roles',
    typeId: 'case-types',
    gDocTypeId: 'g-doc-types',
    roleId: 'roles',
    variableId: 'g-doc-vars',
    varId: 'g-doc-vars',
    caseId: 'cases',
    instructionId: 'case-instructions',
    reminderId: 'case-reminders',
    iconId: 'public-assets',
    headerIconId: 'public-assets',
    headerVariantId: 'private-variants',
    photoId: 'private-variants',
    logoId: 'private-variants',
    mainPhotoId: 'private-variants',
    variantId: 'private-variants',
    avatarId: 'private-variants',
    userFileAssetId: 'private-assets',
    mediaAssetId: 'private-assets',
    assetId: 'private-assets',
    varIds: 'g-doc-vars',
    variableIds: 'g-doc-vars',
    templateId: 'g-doc-templates',
    promocodeId: 'promocodes',
}

export function getRelation(name: string, resource?: string) {
    if (resource === 'app-announcements' && /^image(Pl|Ua|En|Ru)Id$/.test(name))
        return 'public-assets'

    if (name === 'typeId' && resource?.startsWith('g-doc')) return 'g-doc-types'

    if (name === 'assetId' && resource === 'consultation-categories')
        return 'public-assets'

    if (name === 'categoryId' && resource?.includes('consultation'))
        return 'consultation-categories'

    return relations[name]
}
