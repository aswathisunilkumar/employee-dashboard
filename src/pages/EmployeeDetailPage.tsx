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

    if (isLoading) return <p>Loading employee…</p>;
    if (error) return <p>Error: {error}</p>;
    if (!employee) return <p>Employee not found.</p>;

    return (
        <div>
            <Link to="/">← Back to list</Link>
            <EmployeeDetail employee={employee} />
        </div>
    );
}
