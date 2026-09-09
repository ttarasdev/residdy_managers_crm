export const formatDate = (
	isoDate: string,
	locale: 'pl' | 'ua' | 'en' = 'pl',
): string => {
	const date = new Date(isoDate)

	if (isNaN(date.getTime())) return ''

	return new Intl.DateTimeFormat(locale, {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	}).format(date)
}
