export type FormFieldType = 'text' | 'select' | 'icon' | 'case_types_list'

export interface BaseFormField<T = any> {
	name: string
	label: string
	type: FormFieldType
	required?: boolean
	initialValue?: T
}

export type FormValues = Record<string, any>
