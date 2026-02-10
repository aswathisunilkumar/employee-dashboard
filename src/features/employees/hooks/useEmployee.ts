import { useEffect, useState } from 'react';
import type { Employee } from '../types/employee';
import { fetchEmployeeById } from '../data/employeeApi';

/**  Hook to fetch a single employee by ID */
export function useEmployee(id: number) {
  const [employee, setEmployee] = useState<Employee | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [prevId, setPrevId] = useState(id);

  // reset state during render if ID changes
  if (id !== prevId) {
    setPrevId(id);
    setIsLoading(true);
    setEmployee(undefined);
    setError(null);
  }

  useEffect(() => {
    let cancelled = false;

    // Fetch data
    fetchEmployeeById(id)
      .then((data) => {
        if (!cancelled) {
          if (data) {
            setEmployee(data);
          } else {
            setError(`Employee with ID ${id} not found`);
          }
        }
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { employee, isLoading, error };
}
