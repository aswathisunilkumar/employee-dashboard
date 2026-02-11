import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { Employee } from '../types/employee';

interface EmployeeListProps {
  employees: Employee[];
}

const EmployeeList = ({ employees }: EmployeeListProps) => {
  if (employees.length === 0) {
    return (
      <div className="mt-8 rounded-lg border border-dashed border-[var(--color-border-dashed)] py-12 text-center">
        <p className="text-[var(--color-text-muted)]">No employees found.</p>
      </div>
    );
  }

  return (
    <ul className="mt-4 space-y-3">
      {employees.map((emp) => (
        <li key={emp.id}>
          <Link
            to={`/employees/${emp.id}`}
            className="group flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] px-5 py-4 shadow-sm transition-all duration-200 hover:border-[var(--color-primary-border)] hover:shadow-md"
          >
            <div>
              <span className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                {emp.firstName} {emp.lastName}
              </span>
              <p className="mt-0.5 text-sm text-[var(--color-text-secondary)]">
                {emp.role} · {emp.department}
              </p>
            </div>
            <span
              className="text-[var(--color-border-dashed)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-primary-hover)]"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default memo(EmployeeList);
