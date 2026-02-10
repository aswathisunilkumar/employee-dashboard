import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { Employee } from '../types/employee';

interface EmployeeListProps {
    employees: Employee[];
}

const EmployeeList = ({ employees }: EmployeeListProps) => {
    if (employees.length === 0) {
        return (
            <div className="mt-8 rounded-lg border border-dashed border-gray-300 py-12 text-center">
                <p className="text-gray-400">No employees found.</p>
            </div>
        );
    }

    return (
        <ul className="mt-4 space-y-3">
            {employees.map((emp) => (
                <li key={emp.id}>
                    <Link
                        to={`/employees/${emp.id}`}
                        className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:border-indigo-200 hover:shadow-md"
                    >
                        <div>
                            <span className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                {emp.firstName} {emp.lastName}
                            </span>
                            <p className="mt-0.5 text-sm text-gray-500">
                                {emp.role} · {emp.department}
                            </p>
                        </div>
                        <span className="text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-indigo-400" aria-hidden="true">
                            →
                        </span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default memo(EmployeeList);

