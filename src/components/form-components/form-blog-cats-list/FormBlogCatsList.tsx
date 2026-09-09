import ApiFormList, { type ApiFormListProps } from '../form-list/ApiFormList'

export default function FormBlogCatsList(props: ApiFormListProps) {
    return (
        <ApiFormList
            source="blogCategories"
            title="Wybierz kategorie"
            multiple={true}
            {...props}
        />
    )
}
