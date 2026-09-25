import { PrivateBucket, PublicBucket } from '../../api/media/files/files.types'

export type MediaKind = 'public-assets' | 'private-variants' | 'private-assets'

export interface MediaPolicy {
    kind: MediaKind
    bucket?: string
    upload: boolean
    browse: boolean
    icon?: boolean
}

export const mediaBuckets = {
    'public-assets': [PublicBucket.ICONS, PublicBucket.SYSTEM_FILES],
    'private-variants': [
        PrivateBucket.INSTRUCTION_HEADERS,
        PrivateBucket.INSTRUCTION_IMAGES,
        PrivateBucket.BLOG_IMAGES,
        PrivateBucket.ACCOUNT_AVA,
        PrivateBucket.PARTNER_LOGOS,
        PrivateBucket.PARTNER_MAIN,
        PrivateBucket.PARTNER_ADV,
    ],
    'private-assets': [
        PrivateBucket.MANAGER_FILES,
        PrivateBucket.GDOC_TEMPLATES,
        PrivateBucket.USER_DOCS,
        PrivateBucket.CONSULTATION_FILES,
    ],
}

export const bucketLabels: Record<string, string> = {
    icons: 'Ikony',
    system_files: 'Obrazy systemowe i reklamy',
    instruction_headers: 'Okładki instrukcji',
    instruction_images: 'Zdjęcia w instrukcjach',
    blog_images: 'Zdjęcia bloga',
    manager_files: 'Pliki osobiste',
    account_ava: 'Avatary',
    partner_logos: 'Logotypy partnerów',
    partner_main: 'Zdjęcia firm',
    partner_adv: 'Banery partnerów',
    gdoc_templates: 'Szablony dokumentów',
    user_docs: 'Dokumenty użytkowników',
    consultation_files: 'Pliki konsultacji',
}

export function mediaPolicy(
    resource: string | undefined,
    field: string,
    relation?: string,
): MediaPolicy | undefined {
    if (
        !['public-assets', 'private-variants', 'private-assets'].includes(
            relation ?? '',
        )
    )
        return

    if (relation === 'public-assets') {
        const icon =
            /icon/i.test(field) || resource === 'consultation-categories'

        return {
            kind: relation,
            bucket: icon ? 'icons' : 'system_files',
            icon,
            upload: !icon,
            browse: true,
        }
    }

    if (relation === 'private-variants') {
        const bucket =
            resource === 'case-instructions'
                ? 'instruction_headers'
                : resource === 'case-instruction-blocks'
                  ? 'instruction_images'
                  : resource === 'blog-posts'
                    ? 'blog_images'
                    : field === 'avatarId'
                      ? 'account_ava'
                      : resource === 'partner-banners'
                        ? 'partner_adv'
                        : /logo/i.test(field)
                          ? 'partner_logos'
                          : resource?.startsWith('partner')
                            ? 'partner_main'
                            : undefined

        return {
            kind: relation,
            bucket,
            upload: resource !== 'case-instructions',
            browse: resource !== 'blog-posts',
        }
    }

    return {
        kind: 'private-assets',
        bucket:
            resource === 'g-doc-templates' ? 'gdoc_templates' : 'manager_files',
        browse: true,
        upload: true,
    }
}
