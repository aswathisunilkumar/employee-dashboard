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
    const inputClasses =
        'rounded border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none';

    return (
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <input
                type="text"
                placeholder="Search by name or role…"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className={`${inputClasses} min-w-[180px] flex-1`}
            />

            <select
                value={department}
                onChange={(e) => onDepartmentChange(e.target.value)}
                className={inputClasses}
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
                className={inputClasses}
            >
                <option value="name">Sort by Name</option>
                <option value="department">Sort by Department</option>
                <option value="role">Sort by Role</option>
            </select>

            <button
                onClick={onToggleSortOrder}
                className="rounded border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-100"
            >
                {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
            </button>
        </div>
    );
});

