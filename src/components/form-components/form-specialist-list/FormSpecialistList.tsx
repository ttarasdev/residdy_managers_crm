import ApiFormList, { type ApiFormListProps } from '../form-list/ApiFormList'

export default function FormSpecialistList(props: ApiFormListProps) {
    return (
        <ApiFormList
            source="specialists"
            title="Wybierz specjalistę"
            multiple={false}
            {...props}
        />
    )
}
