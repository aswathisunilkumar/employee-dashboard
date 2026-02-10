import { useParams, Link } from 'react-router-dom';
import { useEmployee } from '../features/employees/hooks/useEmployee';
import { EmployeeDetail } from '../features/employees/components/EmployeeDetail';

/**
 * Page component for the employee detail view.
 * Routing concern (reading :id from URL) stays here in the page.
 * Data concern (fetching by ID) is delegated to the useEmployee hook.
 * Rendering concern is delegated to the EmployeeDetail component.
 */
export function EmployeeDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { employee, isLoading, error } = useEmployee(Number(id));

    if (isLoading)
        return <p className="p-8 text-gray-500">Loading employee…</p>;
    if (error) return <p className="p-8 text-red-600">Error: {error}</p>;
    if (!employee)
        return <p className="p-8 text-gray-500">Employee not found.</p>;

    return (
        <div className="mx-auto max-w-3xl px-4 py-8">
            <Link
                to="/"
                className="mb-4 inline-block text-sm text-indigo-600 hover:text-indigo-800"
            >
                ← Back to list
            </Link>
            <EmployeeDetail employee={employee} />
        </div>
    );
}
