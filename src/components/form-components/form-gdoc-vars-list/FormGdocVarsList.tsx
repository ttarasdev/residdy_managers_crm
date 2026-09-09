import ApiFormList, { type ApiFormListProps } from '../form-list/ApiFormList'

export default function FormGdocVarsList(props: ApiFormListProps) {
    return (
        <ApiFormList
            source="documentVariables"
            title="Wybierz zmienne"
            multiple={true}
            {...props}
        />
    )
}
