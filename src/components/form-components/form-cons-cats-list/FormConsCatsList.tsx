import ApiFormList, { type ApiFormListProps } from '../form-list/ApiFormList'

export default function FormConsCatsList(props: ApiFormListProps) {
    return (
        <ApiFormList
            source="consultationCategories"
            title="Wybierz kategorię konsultacji"
            multiple={false}
            {...props}
        />
    )
}
