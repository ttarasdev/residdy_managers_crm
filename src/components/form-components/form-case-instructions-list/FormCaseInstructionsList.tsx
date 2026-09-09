import ApiFormList, { type ApiFormListProps } from '../form-list/ApiFormList'

export default function FormCaseInstructionsList(props: ApiFormListProps) {
    return (
        <ApiFormList
            source="caseInstructions"
            title="Wybierz instrukcję"
            multiple={false}
            {...props}
        />
    )
}
