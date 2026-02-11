import type { Employee } from '../types/employee';
import LeaveChart from './LeaveChart';

interface EmployeeDetailProps {
  employee: Employee;
}

export const EmployeeDetail = ({ employee }: EmployeeDetailProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
        {employee.firstName} {employee.lastName}
      </h2>

      <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
        <dt className="font-medium text-[var(--color-text-secondary)]">ID</dt>
        <dd className="text-[var(--color-text-primary)]">{employee.id}</dd>

        <dt className="font-medium text-[var(--color-text-secondary)]">
          Email
        </dt>
        <dd className="text-[var(--color-text-primary)]">{employee.email}</dd>

        <dt className="font-medium text-[var(--color-text-secondary)]">Role</dt>
        <dd className="text-[var(--color-text-primary)]">{employee.role}</dd>

        <dt className="font-medium text-[var(--color-text-secondary)]">
          Department
        </dt>
        <dd className="text-[var(--color-text-primary)]">
          {employee.department}
        </dd>

        <dt className="font-medium text-[var(--color-text-secondary)]">
          Join Date
        </dt>
        <dd className="text-[var(--color-text-primary)]">
          {employee.joinDate}
        </dd>

        <dt className="font-medium text-[var(--color-text-secondary)]">
          Skills
        </dt>
        <dd className="text-[var(--color-text-primary)]">
          {employee.skills.join(', ')}
        </dd>
      </dl>

      <div className="mt-6 border-t border-[var(--color-border)] pt-6">
        <LeaveChart leaveBalance={employee.leaveBalance} />
      </div>
    </div>
  );
};
