import type { InlineImageRef } from '../../../api/mail/mail-jobs/mail-jobs.types'
import type { PrivateVariant } from '../../../api/media/private-variants/private-variants.types'
import FormVariantsListMulti from './FormVariantsListMulti'

interface Props {
    variants: readonly PrivateVariant[]
    value: readonly InlineImageRef[]
    onChange: (value: InlineImageRef[]) => void
    disabled?: boolean
    size?: 'small' | 'medium' | 'large'
}

export default function FormVariantsInlineImagesList({
    variants,
    value,
    onChange,
    disabled,
    size = 'medium',
}: Props) {
    const assetId = (variant: PrivateVariant) => variant[`${size}AssetId`]

    return (
        <FormVariantsListMulti
            ids={variants.map((item) => item.id)}
            disabled={disabled}
            value={variants
                .filter((variant) =>
                    value.some(
                        (item) => item.mediaAssetId === assetId(variant),
                    ),
                )
                .map((item) => item.id)}
            onChange={(ids) => {
                const known = new Set(variants.map(assetId))

                const selected = variants
                    .filter((variant) => ids.includes(variant.id))
                    .map(
                        (variant) =>
                            value.find(
                                (item) =>
                                    item.mediaAssetId === assetId(variant),
                            ) ?? {
                                mediaAssetId: assetId(variant),
                                cid: `image-${assetId(variant)}`,
                            },
                    )

                onChange([
                    ...value.filter((item) => !known.has(item.mediaAssetId)),
                    ...selected,
                ])
            }}
        />
    )
}
