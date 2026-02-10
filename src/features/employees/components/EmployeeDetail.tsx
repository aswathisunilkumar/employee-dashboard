import type { Employee } from '../types/employee';

interface EmployeeDetailProps {
    employee: Employee;
}

/**
 * Pure presentational component — displays all employee fields.
 * No data fetching, no routing logic. Just renders what it receives.
 */
export function EmployeeDetail({ employee }: EmployeeDetailProps) {
    return (
        <div>
            <h2>
                {employee.firstName} {employee.lastName}
            </h2>

            <dl>
                <dt>ID</dt>
                <dd>{employee.id}</dd>

                <dt>Email</dt>
                <dd>{employee.email}</dd>

                <dt>Role</dt>
                <dd>{employee.role}</dd>

                <dt>Department</dt>
                <dd>{employee.department}</dd>

                <dt>Join Date</dt>
                <dd>{employee.joinDate}</dd>

                <dt>Skills</dt>
                <dd>{employee.skills.join(', ')}</dd>

                <dt>Leave — Annual</dt>
                <dd>{employee.leaveBalance.annual} days</dd>

                <dt>Leave — Sick</dt>
                <dd>{employee.leaveBalance.sick} days</dd>

                <dt>Leave — Used</dt>
                <dd>{employee.leaveBalance.used} days</dd>
            </dl>
        </div>
    );
}
