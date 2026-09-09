import ApiFormList, { type ApiFormListProps } from '../form-list/ApiFormList'

export default function FormRolesList(props: ApiFormListProps) {
    return (
        <ApiFormList
            source="roles"
            title="Wybierz role"
            multiple={true}
            {...props}
        />
    )
}
