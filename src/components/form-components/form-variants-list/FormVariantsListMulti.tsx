import FormVariantsList from './FormVariantsList'
import type { PrivateMediaListProps } from '../private-media-list/PrivateMediaList'

export default function FormVariantsListMulti(props: PrivateMediaListProps) {
    return <FormVariantsList {...props} multiple />
}
