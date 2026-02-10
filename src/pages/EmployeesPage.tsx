import { useEmployees } from '../features/employees/hooks/useEmployees';
import { useEmployeeFilters } from '../features/employees/hooks/useEmployeeFilters';
import EmployeeList from '../features/employees/components/EmployeeList';
import EmployeeFilters from '../features/employees/components/EmployeeFilters';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

import { useEffect } from 'react';

export const EmployeesPage = () => {
    useEffect(() => {
        document.title = 'Employee Dashboard';
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
    if (error) return <ErrorMessage message={error} />;

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Employee Dashboard
                </h1>
                <p className="mt-1 text-sm text-gray-500">
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
                <p className="text-sm font-medium text-gray-500">
                    {filteredEmployees.length} employee(s) found
                </p>
            </div>

            <EmployeeList employees={filteredEmployees} />
        </div>
    );
}

