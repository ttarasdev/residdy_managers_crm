import ApiFormList, { type ApiFormListProps } from '../form-list/ApiFormList'

export default function FormCaseRemindersList(props: ApiFormListProps) {
    return (
        <ApiFormList
            source="caseReminders"
            title="Wybierz przypomnienie"
            multiple={false}
            {...props}
        />
    )
}
