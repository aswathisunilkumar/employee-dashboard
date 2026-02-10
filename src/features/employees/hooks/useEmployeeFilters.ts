import { useCallback, useMemo, useState } from 'react';
import type { Employee } from '../types/employee';
import type { SortOrder } from '../../../types/common';

export type SortField = 'name' | 'department' | 'role';
export type { SortOrder };

export function useEmployeeFilters(employees: Employee[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [department, setDepartment] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // Derive the unique departments for the filter dropdown
  const departments = useMemo(
    () => [...new Set(employees.map((e) => e.department))].sort(),
    [employees]
  );

  // Stable toggle handler
  const toggleSortOrder = useCallback(() => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  // Derive the filtered + sorted list
  const filteredEmployees = useMemo(() => {
    let result = employees;

    // 1. Filter by search query (name or role)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (emp) =>
          emp.firstName.toLowerCase().includes(q) ||
          emp.lastName.toLowerCase().includes(q) ||
          emp.role.toLowerCase().includes(q)
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
            `${b.firstName} ${b.lastName}`
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
  };
}
