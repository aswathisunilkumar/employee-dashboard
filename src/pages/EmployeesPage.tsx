import { useEmployees } from '../features/employees/hooks/useEmployees';
import { useEmployeeFilters } from '../features/employees/hooks/useEmployeeFilters';
import { EmployeeList } from '../features/employees/components/EmployeeList';
import { EmployeeFilters } from '../features/employees/components/EmployeeFilters';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useEffect } from 'react';

export const EmployeesPage = () => {
  useEffect(() => {
    document.title = 'Employee Dashboard';
    return () => {
      document.title = 'Employee Dashboard';
    };
  }, []);

  const { employees, isLoading, error } = useEmployees();
  const {
    filteredEmployees,
    departments,
    searchQuery,
    setSearchQuery,
    department,
    setDepartment,
    sortField,
    setSortField,
    sortOrder,
    toggleSortOrder,
  } = useEmployeeFilters(employees);

  if (isLoading) return <LoadingSpinner message="Loading employees…" />;
  if (error)
    return (
      <div>
        <ErrorMessage message={error} />
      </div>
    );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Employee Dashboard
        </h1>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Manage and browse your team members
        </p>
      </div>

      <EmployeeFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        department={department}
        onDepartmentChange={setDepartment}
        departments={departments}
        sortField={sortField}
        onSortFieldChange={setSortField}
        sortOrder={sortOrder}
        onToggleSortOrder={toggleSortOrder}
      />

      <div className="mt-4 flex items-center justify-between">
        <p
          aria-live="polite"
          className="text-sm font-medium text-[var(--color-text-secondary)]"
        >
          {filteredEmployees.length}{' '}
          {filteredEmployees.length === 1 ? 'employee' : 'employees'} found
        </p>
      </div>

      <EmployeeList employees={filteredEmployees} />
    </div>
  );
};
