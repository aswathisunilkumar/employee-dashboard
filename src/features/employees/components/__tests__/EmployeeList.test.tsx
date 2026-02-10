import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import EmployeeList from '../EmployeeList';
import type { Employee } from '../../types/employee';

/** Wrap component in MemoryRouter since EmployeeList renders <Link>. */
function renderWithRouter(employees: Employee[]) {
  return render(
    <MemoryRouter>
      <EmployeeList employees={employees} />
    </MemoryRouter>
  );
}

const mockEmployees: Employee[] = [
  {
    id: 1,
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya@test.com',
    role: 'Frontend Developer',
    department: 'Engineering',
    joinDate: '2021-03-15',
    skills: ['React'],
    leaveBalance: { annual: 18, sick: 10, used: 5 },
  },
  {
    id: 2,
    firstName: 'Ravi',
    lastName: 'Kumar',
    email: 'ravi@test.com',
    role: 'Product Manager',
    department: 'Product',
    joinDate: '2020-07-01',
    skills: ['Jira'],
    leaveBalance: { annual: 15, sick: 8, used: 3 },
  },
];

describe('EmployeeList', () => {
  it('renders employee names as links', () => {
    renderWithRouter(mockEmployees);

    const link1 = screen.getByRole('link', { name: /priya sharma/i });
    const link2 = screen.getByRole('link', { name: /ravi kumar/i });

    expect(link1).toBeInTheDocument();
    expect(link2).toBeInTheDocument();
  });

  it('links point to the correct detail routes', () => {
    renderWithRouter(mockEmployees);

    const link1 = screen.getByRole('link', { name: /priya sharma/i });
    const link2 = screen.getByRole('link', { name: /ravi kumar/i });

    expect(link1).toHaveAttribute('href', '/employees/1');
    expect(link2).toHaveAttribute('href', '/employees/2');
  });

  it('displays role and department for each employee', () => {
    renderWithRouter(mockEmployees);

    expect(screen.getByText(/frontend developer/i)).toBeInTheDocument();
    expect(screen.getByText(/product manager/i)).toBeInTheDocument();
    expect(screen.getByText(/engineering/i)).toBeInTheDocument();
    expect(screen.getByText(/product/i)).toBeInTheDocument();
  });

  it('shows empty state when no employees are provided', () => {
    renderWithRouter([]);

    expect(screen.getByText(/no employees found/i)).toBeInTheDocument();
  });
});
