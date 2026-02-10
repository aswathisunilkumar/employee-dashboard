import type { SortField, SortOrder } from '../hooks/useEmployeeFilters';

interface EmployeeFiltersProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    department: string;
    onDepartmentChange: (dept: string) => void;
    departments: string[];
    sortField: SortField;
    onSortFieldChange: (field: SortField) => void;
    sortOrder: SortOrder;
    onSortOrderChange: (order: SortOrder) => void;
}

/**
 * Pure presentational component for filter controls.
 * All state lives in the parent hook — this just renders inputs and calls callbacks.
 */
export function EmployeeFilters({
    searchQuery,
    onSearchChange,
    department,
    onDepartmentChange,
    departments,
    sortField,
    onSortFieldChange,
    sortOrder,
    onSortOrderChange,
}: EmployeeFiltersProps) {
    return (
        <div>
            <input
                type="text"
                placeholder="Search by name or role…"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
            />

            <select
                value={department}
                onChange={(e) => onDepartmentChange(e.target.value)}
            >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                    <option key={dept} value={dept}>
                        {dept}
                    </option>
                ))}
            </select>

            <select
                value={sortField}
                onChange={(e) => onSortFieldChange(e.target.value as SortField)}
            >
                <option value="name">Sort by Name</option>
                <option value="department">Sort by Department</option>
                <option value="role">Sort by Role</option>
            </select>

            <button
                onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
                {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
            </button>
        </div>
    );
}
