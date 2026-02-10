import { useEmployees } from '../features/employees/hooks/useEmployees';
import { useEmployeeFilters } from '../features/employees/hooks/useEmployeeFilters';
import { EmployeeList } from '../features/employees/components/EmployeeList';
import { EmployeeFilters } from '../features/employees/components/EmployeeFilters';

/**
 * Page component for the employee list view.
 * Pages are thin orchestrators — they compose hooks and feature components.
 * All data logic lives in hooks; all rendering lives in feature components.
 */
export function EmployeesPage() {
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

    if (isLoading) return <p>Loading employees…</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Employee Dashboard</h1>
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
            <p>{filteredEmployees.length} employee(s) found</p>
            <EmployeeList employees={filteredEmployees} />
        </div>
    );
}

