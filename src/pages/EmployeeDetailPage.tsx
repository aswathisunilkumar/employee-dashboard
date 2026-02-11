import { useParams, Link } from 'react-router-dom';
import { useEmployee } from '../features/employees/hooks/useEmployee';
import { EmployeeDetail } from '../features/employees/components/EmployeeDetail';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useEffect } from 'react';

export const EmployeeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const employeeId = Number(id);
  const isValidId = Number.isFinite(employeeId) && employeeId > 0;

  const { employee, isLoading, error } = useEmployee(
    isValidId ? employeeId : -1
  );

  useEffect(() => {
    if (employee) {
      document.title = `${employee.firstName} ${employee.lastName} - Details`;
    } else {
      document.title = 'Employee Details';
    }
    return () => {
      document.title = 'Employee Dashboard';
    };
  }, [employee]);

  if (!isValidId) {
    return (
      <ErrorMessage message="Invalid employee ID provided. Please check the URL." />
    );
  }

  if (isLoading) return <LoadingSpinner message="Loading employee…" />;
  if (error) return <ErrorMessage message={error} />;
  if (!employee)
    return (
      <div className="rounded-lg border border-dashed border-[var(--color-border-dashed)] py-12 text-center">
        <p className="text-[var(--color-text-muted)]">Employee not found.</p>
      </div>
    );

  return (
    <div>
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1 rounded-full bg-[var(--color-bg-muted)] px-3 py-1.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        Back to list
      </Link>
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 shadow-sm sm:p-8">
        <EmployeeDetail employee={employee} />
      </div>
    </div>
  );
};
