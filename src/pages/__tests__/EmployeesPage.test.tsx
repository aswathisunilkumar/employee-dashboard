import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { EmployeesPage } from '../EmployeesPage';
import type { Employee } from '../../features/employees/types/employee';

// ── Mock data ───────────────────────────────────────────────
const mockEmployees: Employee[] = [
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Martin',
    email: 'alice@test.com',
    role: 'Developer',
    department: 'Engineering',
    joinDate: '2021-01-01',
    skills: ['React'],
    leaveBalance: { annual: 15, sick: 10, used: 3 },
  },
  {
    id: 2,
    firstName: 'Bob',
    lastName: 'Lee',
    email: 'bob@test.com',
    role: 'Designer',
    department: 'Design',
    joinDate: '2022-06-15',
    skills: ['Figma'],
    leaveBalance: { annual: 12, sick: 8, used: 5 },
  },
  {
    id: 3,
    firstName: 'Carol',
    lastName: 'Evans',
    email: 'carol@test.com',
    role: 'Backend Developer',
    department: 'Engineering',
    joinDate: '2020-03-10',
    skills: ['Node'],
    leaveBalance: { annual: 18, sick: 10, used: 7 },
  },
];

// ── Mock the data-fetching hook ─────────────────────────────
vi.mock('../../features/employees/hooks/useEmployees', () => ({
  useEmployees: () => ({
    employees: mockEmployees,
    isLoading: false,
    error: null,
  }),
}));

function renderPage() {
  return render(
    <MemoryRouter>
      <EmployeesPage />
    </MemoryRouter>
  );
}

describe('EmployeesPage', () => {
  it('renders the heading and employee count', () => {
    renderPage();

    expect(
      screen.getByRole('heading', { name: /employee dashboard/i })
    ).toBeInTheDocument();
    expect(screen.getByText('3 employee(s) found')).toBeInTheDocument();
  });

  it('renders all employee names in the list', () => {
    renderPage();

    expect(
      screen.getByRole('link', { name: /alice martin/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /bob lee/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /carol evans/i })
    ).toBeInTheDocument();
  });

  it('filters the list when the user types in the search box', async () => {
    const user = userEvent.setup();
    renderPage();

    const searchInput = screen.getByPlaceholderText(/search by name or role/i);
    await user.type(searchInput, 'alice');

    expect(screen.getByText('1 employee(s) found')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /alice martin/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /bob lee/i })
    ).not.toBeInTheDocument();
  });

  it('filters by department when a department is selected', async () => {
    const user = userEvent.setup();
    renderPage();

    const deptSelect = screen.getByDisplayValue('All Departments');
    await user.selectOptions(deptSelect, 'Design');

    expect(screen.getByText('1 employee(s) found')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /bob lee/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /alice martin/i })
    ).not.toBeInTheDocument();
  });

  it('shows "No employees found" when search matches nothing', async () => {
    const user = userEvent.setup();
    renderPage();

    const searchInput = screen.getByPlaceholderText(/search by name or role/i);
    await user.type(searchInput, 'zzzzz');

    expect(screen.getByText('0 employee(s) found')).toBeInTheDocument();
    expect(screen.getByText(/no employees found/i)).toBeInTheDocument();
  });
});
