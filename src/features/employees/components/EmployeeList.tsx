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
        return <p>No employees found.</p>;
    }

    return (
        <ul>
            {employees.map((emp) => (
                <li key={emp.id}>
                    <Link to={`/employees/${emp.id}`}>
                        <strong>
                            {emp.firstName} {emp.lastName}
                        </strong>
                    </Link>{' '}
                    — {emp.role}, {emp.department}
                </li>
            ))}
        </ul>
    );
});

