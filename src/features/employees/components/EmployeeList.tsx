import type { Employee } from '../types/employee';

interface EmployeeListProps {
    employees: Employee[];
}

/**
 * Pure presentational component — receives data via props, renders a list.
 * No data-fetching, no side effects, easy to test and reason about.
 */
export function EmployeeList({ employees }: EmployeeListProps) {
    if (employees.length === 0) {
        return <p>No employees found.</p>;
    }

    return (
        <ul>
            {employees.map((emp) => (
                <li key={emp.id}>
                    <strong>
                        {emp.firstName} {emp.lastName}
                    </strong>{' '}
                    — {emp.role}, {emp.department}
                </li>
            ))}
        </ul>
    );
}
