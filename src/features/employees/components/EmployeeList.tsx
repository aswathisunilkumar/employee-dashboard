import { Link } from 'react-router-dom';
import type { Employee } from '../types/employee';

interface EmployeeListProps {
    employees: Employee[];
}

/**
 * Pure presentational component — renders a list with navigable links.
 * Each employee name links to /employees/:id for the detail view.
 */
export function EmployeeList({ employees }: EmployeeListProps) {
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
}
