import { Routes, Route, Navigate } from 'react-router-dom';
import { EmployeesPage } from './pages/EmployeesPage';
import { EmployeeDetailPage } from './pages/EmployeeDetailPage';

/**
 * App is now a pure routing shell.
 * All page logic lives in pages/; all feature logic lives in features/.
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<EmployeesPage />} />
      <Route path="/employees/:id" element={<EmployeeDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
