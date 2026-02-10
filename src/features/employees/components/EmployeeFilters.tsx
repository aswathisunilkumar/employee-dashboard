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

/** Filter controls for the employee list. */
const EmployeeFilters = ({
    searchQuery,
    onSearchChange,
    department,
    onDepartmentChange,
    departments,
    sortField,
    onSortFieldChange,
    sortOrder,
    onToggleSortOrder,
}: EmployeeFiltersProps) => {
    const inputClasses =
        'rounded border border-gray-300 px-3 py-2 text-sm';

    return (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <input
                type="text"
                aria-label="Search employees"
                placeholder="Search by name or role…"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className={`${inputClasses} min-w-[180px] flex-1`}
            />

            <select
                aria-label="Filter by department"
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
                aria-label="Sort by"
                value={sortField}
                onChange={(e) => onSortFieldChange(e.target.value as SortField)}
                className={inputClasses}
            >
                <option value="name">Sort by Name</option>
                <option value="department">Sort by Department</option>
                <option value="role">Sort by Role</option>
            </select>

            <button
                aria-label="Toggle sort order"
                onClick={onToggleSortOrder}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
            >
                {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
            </button>
        </div>
    );
}

export default memo(EmployeeFilters);

