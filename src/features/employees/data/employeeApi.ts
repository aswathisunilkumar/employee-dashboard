import type { Employee } from '../types/employee';
import employeesData from './employees.json';

/**
 * Simulates an API call with a small delay.
 * This keeps the same interface we'd use with a real REST API,
 * so swapping to fetch() later requires zero component changes.
 */
const simulateDelay = (ms = 300): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

/** Fetch all employees */
export async function fetchEmployees(): Promise<Employee[]> {
    await simulateDelay();
    return employeesData as Employee[];
}

/** Fetch a single employee by id */
export async function fetchEmployeeById(
    id: number,
): Promise<Employee | undefined> {
    await simulateDelay();
    return (employeesData as Employee[]).find((emp) => emp.id === id);
}
