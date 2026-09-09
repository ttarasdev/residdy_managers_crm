import ApiFormList, { type ApiFormListProps } from '../form-list/ApiFormList'

export default function FormCaseTypesList(props: ApiFormListProps) {
    return (
        <ApiFormList
            source="caseTypes"
            title="Wybierz typ sprawy"
            multiple={false}
            {...props}
        />
    )
}
