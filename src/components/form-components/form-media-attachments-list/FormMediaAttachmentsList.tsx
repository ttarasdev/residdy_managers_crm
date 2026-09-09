import type { AttachmentRef } from '../../../api/mail/mail-jobs/mail-jobs.types'
import PrivateMediaList from '../private-media-list/PrivateMediaList'

export default function FormMediaAttachmentsList({
    ids,
    value,
    onChange,
    disabled,
}: {
    ids: readonly number[]
    value: readonly AttachmentRef[]
    onChange: (value: AttachmentRef[]) => void
    disabled?: boolean
}) {
    return (
        <PrivateMediaList
            ids={ids}
            kind="asset"
            multiple
            disabled={disabled}
            value={value.map((item) => item.mediaAssetId)}
            onChange={(selected) =>
                onChange(
                    selected.map(
                        (id) =>
                            value.find((item) => item.mediaAssetId === id) ?? {
                                mediaAssetId: id,
                            },
                    ),
                )
            }
        />
    )
}
