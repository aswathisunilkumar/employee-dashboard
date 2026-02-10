import { useMemo, useState } from 'react';
import type { Employee } from '../types/employee';

export type SortField = 'name' | 'department' | 'role';
export type SortOrder = 'asc' | 'desc';

interface FilterState {
    searchQuery: string;
    department: string;
    sortField: SortField;
    sortOrder: SortOrder;
}

/**
 * Hook that derives a filtered + sorted employee list from the source array.
 *
 * Key design decisions:
 * - searchQuery, department, sortField, sortOrder → real state (user inputs).
 * - filteredEmployees → derived via useMemo, NOT stored in state.
 *   This avoids duplication and keeps the source of truth single.
 * - useMemo recomputes only when employees or a filter value changes,
 *   so the list component skips unnecessary re-renders.
 */
export function useEmployeeFilters(employees: Employee[]) {
    const [searchQuery, setSearchQuery] = useState('');
    const [department, setDepartment] = useState('');
    const [sortField, setSortField] = useState<SortField>('name');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

    // Derive the unique departments for the filter dropdown
    const departments = useMemo(
        () => [...new Set(employees.map((e) => e.department))].sort(),
        [employees],
    );

    // Derive the filtered + sorted list — never stored as separate state
    const filteredEmployees = useMemo(() => {
        let result = employees;

        // 1. Filter by search query (matches first name, last name, or role)
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (emp) =>
                    emp.firstName.toLowerCase().includes(q) ||
                    emp.lastName.toLowerCase().includes(q) ||
                    emp.role.toLowerCase().includes(q),
            );
        }

        // 2. Filter by department
        if (department) {
            result = result.filter((emp) => emp.department === department);
        }

        // 3. Sort
        const sorted = [...result].sort((a, b) => {
            let comparison = 0;
            switch (sortField) {
                case 'name':
                    comparison = `${a.firstName} ${a.lastName}`.localeCompare(
                        `${b.firstName} ${b.lastName}`,
                    );
                    break;
                case 'department':
                    comparison = a.department.localeCompare(b.department);
                    break;
                case 'role':
                    comparison = a.role.localeCompare(b.role);
                    break;
            }
            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return sorted;
    }, [employees, searchQuery, department, sortField, sortOrder]);

    return {
        // Derived data
        filteredEmployees,
        departments,
        // Filter state + setters (for the UI to bind to)
        searchQuery,
        setSearchQuery,
        department,
        setDepartment,
        sortField,
        setSortField,
        sortOrder,
        setSortOrder,
    };
}
