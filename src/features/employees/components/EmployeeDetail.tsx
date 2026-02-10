import type { Employee } from '../types/employee';
import LeaveChart from './LeaveChart';

interface EmployeeDetailProps {
  employee: Employee;
}

export const EmployeeDetail = ({ employee }: EmployeeDetailProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">
        {employee.firstName} {employee.lastName}
      </h2>

      <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
        <dt className="font-medium text-gray-500">ID</dt>
        <dd className="text-gray-900">{employee.id}</dd>

        <dt className="font-medium text-gray-500">Email</dt>
        <dd className="text-gray-900">{employee.email}</dd>

        <dt className="font-medium text-gray-500">Role</dt>
        <dd className="text-gray-900">{employee.role}</dd>

        <dt className="font-medium text-gray-500">Department</dt>
        <dd className="text-gray-900">{employee.department}</dd>

        <dt className="font-medium text-gray-500">Join Date</dt>
        <dd className="text-gray-900">{employee.joinDate}</dd>

        <dt className="font-medium text-gray-500">Skills</dt>
        <dd className="text-gray-900">{employee.skills.join(', ')}</dd>
      </dl>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <LeaveChart leaveBalance={employee.leaveBalance} />
      </div>
    </div>
  );
};
