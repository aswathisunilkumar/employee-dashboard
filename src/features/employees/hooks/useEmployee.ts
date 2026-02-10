import { useEffect, useState } from 'react';
import type { Employee } from '../types/employee';
import { fetchEmployeeById } from '../data/employeeApi';

/**
 * Hook to fetch a single employee by ID.
 * Mirrors useEmployees but for the detail view.
 */
export function useEmployee(id: number) {
    const [employee, setEmployee] = useState<Employee | undefined>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        setIsLoading(true);
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
