import { useParams, Link } from 'react-router-dom';
import { useEmployee } from '../features/employees/hooks/useEmployee';
import { EmployeeDetail } from '../features/employees/components/EmployeeDetail';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

import { useEffect } from 'react';

export const EmployeeDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { employee, isLoading, error } = useEmployee(Number(id));

    useEffect(() => {
        if (employee) {
            document.title = `${employee.firstName} ${employee.lastName} - Details`;
        } else {
            document.title = 'Employee Details';
        }
    }, [employee]);

    if (isLoading) return <LoadingSpinner message="Loading employee…" />;
    if (error) return <ErrorMessage message={error} />;
    if (!employee)
        return (
            <div className="rounded-lg border border-dashed border-gray-300 py-12 text-center">
                <p className="text-gray-400">Employee not found.</p>
            </div>
        );

    return (
        <div>
            <Link
                to="/"
                className="mb-6 inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
            >
                ← Back to list
            </Link>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <EmployeeDetail employee={employee} />
            </div>
        </div>
    );
}
