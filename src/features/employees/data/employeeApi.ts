import type { Employee } from '../types/employee';
import employeesData from './employees.json';

/** Simulates a backend API with a delay. */
const simulateDelay = (ms = 300): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/** Fetches the list of all employees. */
export async function fetchEmployees(): Promise<Employee[]> {
  await simulateDelay();
  return employeesData as Employee[];
}

/** Fetches a single employee by ID. */
export async function fetchEmployeeById(
  id: number
): Promise<Employee | undefined> {
  await simulateDelay();
  return (employeesData as Employee[]).find((emp) => emp.id === id);
}
