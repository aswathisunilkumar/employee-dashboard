import { renderHook, waitFor } from '@testing-library/react';
import { useEmployee } from '../useEmployee';
import { fetchEmployeeById } from '../../data/employeeApi';
import type { Employee } from '../../types/employee';

// Mock the API module
jest.mock('../../data/employeeApi');

const mockFetchEmployeeById = fetchEmployeeById as jest.MockedFunction<
  typeof fetchEmployeeById
>;

const mockEmployee: Employee = {
  id: 1,
  firstName: 'Test',
  lastName: 'User',
  email: 'test@test.com',
  role: 'Dev',
  department: 'Engineering',
  joinDate: '2022-01-01',
  skills: ['React'],
  leaveBalance: { annual: 10, sick: 5, used: 2 },
};

describe('useEmployee', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('starts with loading state', () => {
    mockFetchEmployeeById.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useEmployee(1));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.employee).toBeUndefined();
    expect(result.current.error).toBeNull();
  });

  it('fetches and returns a single employee', async () => {
    mockFetchEmployeeById.mockResolvedValue(mockEmployee);
    const { result } = renderHook(() => useEmployee(1));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.employee).toEqual(mockEmployee);
    expect(result.current.error).toBeNull();
  });

  it('handles "not found" (returns undefined)', async () => {
    mockFetchEmployeeById.mockResolvedValue(undefined);
    const { result } = renderHook(() => useEmployee(99));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.employee).toBeUndefined();
    expect(result.current.error).toBe('Employee with ID 99 not found');
  });

  it('handles fetch errors', async () => {
    const errorMsg = 'Network Error';
    mockFetchEmployeeById.mockRejectedValue(new Error(errorMsg));
    const { result } = renderHook(() => useEmployee(1));

    await waitFor(() => expect(result.current.error).toBe(errorMsg));

    expect(result.current.isLoading).toBe(false);
  });
});
