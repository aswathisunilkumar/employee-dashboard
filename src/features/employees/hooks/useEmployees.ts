import { useEffect, useState } from 'react';
import type { Employee } from '../types/employee';
import { fetchEmployees } from '../data/employeeApi';

/**
 * Custom hook that owns the employee data-fetching lifecycle.
 * Components call this hook instead of touching the API directly.
 */
export function useEmployees() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        fetchEmployees()
            .then((data) => {
                if (!cancelled) setEmployees(data);
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
    }, []);

    return { employees, isLoading, error };
}
