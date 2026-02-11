import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmployeeFilters } from '../EmployeeFilters';

describe('EmployeeFilters', () => {
  const defaultProps = {
    searchQuery: '',
    onSearchChange: jest.fn(),
    department: '',
    onDepartmentChange: jest.fn(),
    departments: ['Engineering', 'Design', 'Product'],
    sortField: 'name' as const,
    onSortFieldChange: jest.fn(),
    sortOrder: 'asc' as const,
    onToggleSortOrder: jest.fn(),
  };

  it('renders all controls', () => {
    render(<EmployeeFilters {...defaultProps} />);

    expect(
      screen.getByPlaceholderText(/search by name or role/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/filter by department/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sort by/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /toggle sort/i })
    ).toBeInTheDocument();
  });

  it('calls onSearchChange when typing', async () => {
    const user = userEvent.setup();
    render(<EmployeeFilters {...defaultProps} />);

    const input = screen.getByPlaceholderText(/search by name or role/i);
    await user.type(input, 'test');

    expect(defaultProps.onSearchChange).toHaveBeenCalledTimes(4);
  });

  it('calls onDepartmentChange when selecting a department', async () => {
    const user = userEvent.setup();
    render(<EmployeeFilters {...defaultProps} />);

    const select = screen.getByLabelText(/filter by department/i);
    await user.selectOptions(select, 'Engineering');

    expect(defaultProps.onDepartmentChange).toHaveBeenCalledWith('Engineering');
  });

  it('calls onToggleSortOrder when clicking the sort button', async () => {
    const user = userEvent.setup();
    render(<EmployeeFilters {...defaultProps} />);

    const button = screen.getByRole('button', { name: /toggle sort/i });
    await user.click(button);

    expect(defaultProps.onToggleSortOrder).toHaveBeenCalledTimes(1);
  });
});
