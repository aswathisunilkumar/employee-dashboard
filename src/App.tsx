import { useEmployees } from './features/employees/hooks/useEmployees';
import { EmployeeList } from './features/employees/components/EmployeeList';

function App() {
  const { employees, isLoading, error } = useEmployees();

  if (isLoading) return <p>Loading employees…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Employee Dashboard</h1>
      <EmployeeList employees={employees} />
    </div>
  );
}

export default App;
