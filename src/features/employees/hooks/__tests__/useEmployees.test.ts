import { renderHook, waitFor } from '@testing-library/react';
import { useEmployees } from '../useEmployees';
import { fetchEmployees } from '../../data/employeeApi';
import type { Employee } from '../../types/employee';

// Mock the API module
jest.mock('../../data/employeeApi');

const mockFetchEmployees = fetchEmployees as jest.MockedFunction<
  typeof fetchEmployees
>;

const mockData: Employee[] = [
  {
    id: 1,
    firstName: 'Test',
    lastName: 'User',
    email: 'test@test.com',
    role: 'Dev',
    department: 'Engineering',
    joinDate: '2022-01-01',
    skills: ['React'],
    leaveBalance: { annual: 10, sick: 5, used: 2 },
  },
];

describe('useEmployees', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('starts with loading state', () => {
    // Return a promise that never resolves to test initial state
    mockFetchEmployees.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useEmployees());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.employees).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('fetches and returns employees', async () => {
    mockFetchEmployees.mockResolvedValue(mockData);
    const { result } = renderHook(() => useEmployees());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.employees).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('handles errors', async () => {
    const errorMsg = 'Failed to fetch';
    mockFetchEmployees.mockRejectedValue(new Error(errorMsg));
    const { result } = renderHook(() => useEmployees());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe(errorMsg);
    expect(result.current.employees).toEqual([]);
  });
});
