import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { EmployeeDetailPage } from '../EmployeeDetailPage';
import { useEmployee } from '../../features/employees/hooks/useEmployee';
import type { Employee } from '../../features/employees/types/employee';

// Mock the hook
jest.mock('../../features/employees/hooks/useEmployee');

const mockUseEmployee = useEmployee as jest.MockedFunction<typeof useEmployee>;

const mockEmployee: Employee = {
  id: 1,
  firstName: 'Priya',
  lastName: 'Sharma',
  email: 'priya@test.com',
  role: 'Dev',
  department: 'Engineering',
  joinDate: '2021-03-15',
  skills: ['React'],
  leaveBalance: { annual: 20, sick: 10, used: 5 },
};

function renderPage(initialEntry = '/employees/1') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/employees/:id" element={<EmployeeDetailPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('EmployeeDetailPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading spinner initially', () => {
    mockUseEmployee.mockReturnValue({
      employee: undefined,
      isLoading: true,
      error: null,
    });

    renderPage();
    expect(screen.getByText(/loading employee/i)).toBeInTheDocument();
  });

  it('renders employee details when loaded', () => {
    mockUseEmployee.mockReturnValue({
      employee: mockEmployee,
      isLoading: false,
      error: null,
    });

    renderPage();
    expect(
      screen.getByRole('heading', { name: /priya sharma/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Dev')).toBeInTheDocument();
  });

  it('shows error message if error occurs', () => {
    mockUseEmployee.mockReturnValue({
      employee: undefined,
      isLoading: false,
      error: 'Failed to fetch',
    });

    renderPage();
    expect(screen.getByText(/error: failed to fetch/i)).toBeInTheDocument();
  });

  it('shows "not found" message if employee is null', () => {
    mockUseEmployee.mockReturnValue({
      employee: undefined,
      isLoading: false,
      error: null,
    });

    renderPage();
    expect(screen.getByText(/employee not found/i)).toBeInTheDocument();
  });
});
