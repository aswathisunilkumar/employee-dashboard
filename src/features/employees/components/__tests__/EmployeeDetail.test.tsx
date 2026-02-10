import { render, screen } from '@testing-library/react';

import { EmployeeDetail } from '../EmployeeDetail';
import type { Employee } from '../../types/employee';

// Mock LeaveChart — it uses recharts which needs a real DOM canvas.
// We only care that EmployeeDetail passes the right data through.
jest.mock('../LeaveChart', () => ({
  __esModule: true,
  default: ({ leaveBalance }: { leaveBalance: Employee['leaveBalance'] }) => (
    <div data-testid="leave-chart">
      {leaveBalance.annual}/{leaveBalance.sick}/{leaveBalance.used}
    </div>
  ),
}));

const employee: Employee = {
  id: 42,
  firstName: 'Priya',
  lastName: 'Sharma',
  email: 'priya@company.com',
  role: 'Senior Frontend Developer',
  department: 'Engineering',
  joinDate: '2021-03-15',
  skills: ['React', 'TypeScript', 'GraphQL'],
  leaveBalance: { annual: 18, sick: 10, used: 5 },
};

describe('EmployeeDetail', () => {
  it('renders the employee full name as a heading', () => {
    render(<EmployeeDetail employee={employee} />);

    expect(
      screen.getByRole('heading', { name: /priya sharma/i })
    ).toBeInTheDocument();
  });

  it('displays all key employee fields', () => {
    render(<EmployeeDetail employee={employee} />);

    expect(screen.getByText('priya@company.com')).toBeInTheDocument();
    expect(screen.getByText('Senior Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('2021-03-15')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders skills as a comma-separated list', () => {
    render(<EmployeeDetail employee={employee} />);

    expect(screen.getByText('React, TypeScript, GraphQL')).toBeInTheDocument();
  });

  it('passes leave balance data to LeaveChart', () => {
    render(<EmployeeDetail employee={employee} />);

    const chart = screen.getByTestId('leave-chart');
    expect(chart).toHaveTextContent('18/10/5');
  });
});
