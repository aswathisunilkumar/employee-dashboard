import { memo } from 'react';
import type { SortField } from '../hooks/useEmployeeFilters';

interface EmployeeFiltersProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    department: string;
    onDepartmentChange: (dept: string) => void;
    departments: string[];
    sortField: SortField;
    onSortFieldChange: (field: SortField) => void;
    sortOrder: 'asc' | 'desc';
    onToggleSortOrder: () => void;
}

/**
 * Pure presentational component for filter controls.
 * All state lives in the parent hook — this just renders inputs and calls callbacks.
 *
 * Wrapped in React.memo because:
 * - It re-renders on every keystroke in the search input (expected).
 * - But it should NOT re-render when only filteredEmployees changes
 *   downstream. memo + stable callback refs from the hook prevent that.
 */
export const EmployeeFilters = memo(function EmployeeFilters({
    searchQuery,
    onSearchChange,
    department,
    onDepartmentChange,
    departments,
    sortField,
    onSortFieldChange,
    sortOrder,
    onToggleSortOrder,
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

            <button onClick={onToggleSortOrder}>
                {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
            </button>
        </div>
    );
});

