import ApiFormList, { type ApiFormListProps } from '../form-list/ApiFormList'

export default function FormGdocTypesList(props: ApiFormListProps) {
    return (
        <ApiFormList
            source="documentTypes"
            title="Wybierz typ dokumentu"
            multiple={false}
            {...props}
        />
    )
}
