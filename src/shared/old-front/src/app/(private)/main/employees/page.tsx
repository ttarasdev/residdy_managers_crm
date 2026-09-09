import PageTitle from '@/components/page-components/page-title/PageTitle'
import c from './EmployeesPage.module.scss'
import EmployeesBlock from '@/components/employees/employees-block/EmployeesBlock'

const EmployeesPage = () => {
	return (
		<div className={c.page}>
			<PageTitle title="Pracowmicy" />
			<div className={c.page__row}>
				<EmployeesBlock />
			</div>
		</div>
	)
}

export default EmployeesPage
