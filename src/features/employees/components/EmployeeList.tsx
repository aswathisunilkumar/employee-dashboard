import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { Employee } from '../types/employee';

interface EmployeeListProps {
    employees: Employee[];
}

/**
 * Pure presentational component — renders a list with navigable links.
 *
 * Wrapped in React.memo because:
 * - The parent (EmployeesPage) re-renders on every filter state change.
 * - If the derived filteredEmployees array hasn't changed (same reference
 *   from useMemo), this component skips re-rendering entirely.
 */
export const EmployeeList = memo(function EmployeeList({
    employees,
}: EmployeeListProps) {
    if (employees.length === 0) {
        return <p className="py-8 text-center text-gray-400">No employees found.</p>;
    }

    return (
        <ul className="mt-4 space-y-2">
            {employees.map((emp) => (
                <li
                    key={emp.id}
                    className="rounded-lg border border-gray-200 px-4 py-3 hover:bg-gray-50"
                >
                    <Link
                        to={`/employees/${emp.id}`}
                        className="font-medium text-indigo-600 hover:text-indigo-800"
                    >
                        {emp.firstName} {emp.lastName}
                    </Link>
                    <span className="ml-2 text-sm text-gray-500">
                        — {emp.role}, {emp.department}
                    </span>
                </li>
            ))}
        </ul>
    );
});

