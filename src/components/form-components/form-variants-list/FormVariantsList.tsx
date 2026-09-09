import PrivateMediaList, {
    type PrivateMediaListProps,
} from '../private-media-list/PrivateMediaList'

export default function FormVariantsList(props: PrivateMediaListProps) {
    return <PrivateMediaList {...props} kind="variant" />
}
