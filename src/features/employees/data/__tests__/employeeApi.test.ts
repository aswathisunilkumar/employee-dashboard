import { describe, it, expect } from 'vitest';
import { fetchEmployees, fetchEmployeeById } from '../employeeApi';

describe('employeeApi', () => {
    describe('fetchEmployees', () => {
        it('returns a non-empty array of employees', async () => {
            const employees = await fetchEmployees();

            expect(employees.length).toBeGreaterThan(0);
        });

        it('each employee has the required shape', async () => {
            const employees = await fetchEmployees();

            for (const emp of employees) {
                expect(emp).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        firstName: expect.any(String),
                        lastName: expect.any(String),
                        email: expect.any(String),
                        department: expect.any(String),
                        role: expect.any(String),
                        joinDate: expect.any(String),
                        skills: expect.any(Array),
                        leaveBalance: expect.objectContaining({
                            annual: expect.any(Number),
                            sick: expect.any(Number),
                            used: expect.any(Number),
                        }),
                    }),
                );
            }
        });

        it('all employee IDs are unique', async () => {
            const employees = await fetchEmployees();
            const ids = employees.map((e) => e.id);

            expect(new Set(ids).size).toBe(ids.length);
        });
    });

    describe('fetchEmployeeById', () => {
        it('returns the correct employee for a valid ID', async () => {
            const employee = await fetchEmployeeById(1);

            expect(employee).toBeDefined();
            expect(employee!.id).toBe(1);
            expect(employee!.firstName).toBe('Priya');
        });

        it('returns undefined for a non-existent ID', async () => {
            const employee = await fetchEmployeeById(9999);

            expect(employee).toBeUndefined();
        });
    });
});
