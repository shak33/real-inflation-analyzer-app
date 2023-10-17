import { CompaniesForm } from './CompaniesForm';
import { CompaniesTable } from './CompaniesTable';

export default function CompaniesPage() {
  return (
    <>
      <h1 className="mb-8">Companies</h1>
      <CompaniesForm />
      <CompaniesTable />
    </>
  )
};