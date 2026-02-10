import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useEmployeeFilters } from '../useEmployeeFilters';
import type { Employee } from '../../types/employee';

/** Minimal mock employees for testing filter/sort logic. */
const mockEmployees: Employee[] = [
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice@test.com',
    role: 'Developer',
    department: 'Engineering',
    joinDate: '2021-01-01',
    skills: ['React'],
    leaveBalance: { annual: 15, sick: 10, used: 3 },
  },
  {
    id: 2,
    firstName: 'Bob',
    lastName: 'Jones',
    email: 'bob@test.com',
    role: 'Designer',
    department: 'Design',
    joinDate: '2022-06-15',
    skills: ['Figma'],
    leaveBalance: { annual: 12, sick: 8, used: 5 },
  },
  {
    id: 3,
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie@test.com',
    role: 'Backend Developer',
    department: 'Engineering',
    joinDate: '2020-03-10',
    skills: ['Node'],
    leaveBalance: { annual: 18, sick: 10, used: 7 },
  },
];

describe('useEmployeeFilters', () => {
  it('returns all employees when no filters are active', () => {
    const { result } = renderHook(() => useEmployeeFilters(mockEmployees));

    expect(result.current.filteredEmployees).toHaveLength(3);
  });

  it('extracts and sorts unique departments', () => {
    const { result } = renderHook(() => useEmployeeFilters(mockEmployees));

    expect(result.current.departments).toEqual(['Design', 'Engineering']);
  });

  // ── Search ──────────────────────────────────────────────

  it('filters by first name (case-insensitive)', () => {
    const { result } = renderHook(() => useEmployeeFilters(mockEmployees));

    act(() => result.current.setSearchQuery('alice'));

    expect(result.current.filteredEmployees).toHaveLength(1);
    expect(result.current.filteredEmployees[0].firstName).toBe('Alice');
  });

  it('filters by last name', () => {
    const { result } = renderHook(() => useEmployeeFilters(mockEmployees));

    act(() => result.current.setSearchQuery('Brown'));

    expect(result.current.filteredEmployees).toHaveLength(1);
    expect(result.current.filteredEmployees[0].lastName).toBe('Brown');
  });

  it('filters by role', () => {
    const { result } = renderHook(() => useEmployeeFilters(mockEmployees));

    act(() => result.current.setSearchQuery('designer'));

    expect(result.current.filteredEmployees).toHaveLength(1);
    expect(result.current.filteredEmployees[0].role).toBe('Designer');
  });

  it('returns empty array when search matches nothing', () => {
    const { result } = renderHook(() => useEmployeeFilters(mockEmployees));

    act(() => result.current.setSearchQuery('zzz'));

    expect(result.current.filteredEmployees).toHaveLength(0);
  });

  // ── Department filter ───────────────────────────────────

  it('filters by department', () => {
    const { result } = renderHook(() => useEmployeeFilters(mockEmployees));

    act(() => result.current.setDepartment('Engineering'));

    expect(result.current.filteredEmployees).toHaveLength(2);
    expect(
      result.current.filteredEmployees.every(
        (e) => e.department === 'Engineering'
      )
    ).toBe(true);
  });

  // ── Combined search + department ────────────────────────

  it('combines search and department filters', () => {
    const { result } = renderHook(() => useEmployeeFilters(mockEmployees));

    act(() => {
      result.current.setSearchQuery('developer');
      result.current.setDepartment('Engineering');
    });

    // Alice (Developer, Eng) + Charlie (Backend Developer, Eng)
    expect(result.current.filteredEmployees).toHaveLength(2);
  });

  // ── Sort ────────────────────────────────────────────────

  it('sorts by name ascending by default', () => {
    const { result } = renderHook(() => useEmployeeFilters(mockEmployees));

    const names = result.current.filteredEmployees.map((e) => e.firstName);
    expect(names).toEqual(['Alice', 'Bob', 'Charlie']);
  });

  it('sorts by name descending when toggled', () => {
    const { result } = renderHook(() => useEmployeeFilters(mockEmployees));

    act(() => result.current.toggleSortOrder());

    const names = result.current.filteredEmployees.map((e) => e.firstName);
    expect(names).toEqual(['Charlie', 'Bob', 'Alice']);
  });

  it('sorts by department', () => {
    const { result } = renderHook(() => useEmployeeFilters(mockEmployees));

    act(() => result.current.setSortField('department'));

    const depts = result.current.filteredEmployees.map((e) => e.department);
    expect(depts).toEqual(['Design', 'Engineering', 'Engineering']);
  });

  it('sorts by role', () => {
    const { result } = renderHook(() => useEmployeeFilters(mockEmployees));

    act(() => result.current.setSortField('role'));

    const roles = result.current.filteredEmployees.map((e) => e.role);
    expect(roles).toEqual(['Backend Developer', 'Designer', 'Developer']);
  });
});
