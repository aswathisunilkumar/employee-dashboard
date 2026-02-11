# Employee Dashboard 🚀

A modern, responsive, and accessible dashboard for managing employee records and visualizing leave data. Built with performance and accessibility in mind.

**Live Demo:** [https://employee-dashboard-mu-seven.vercel.app](https://employee-dashboard-mu-seven.vercel.app)

## ✨ Key Features

- **Smart Filtering**:
  - Real-time search by name or role.
  - Filter by department (Engineering, Design, Product, etc.).
  - Sort by Name, Department, or Role (Ascending/Descending).
- **Data Visualization**:
  - Interactive bar charts showing leave balances (Annual, Sick, Used) powered by `Recharts`.
  - Accessible charts with ARIA labels for screen readers.
- **Performance Optimized**:
  - **Memoization**: Heavy components (`EmployeeList`, `LeaveChart`) are wrapped in `React.memo` to prevent unnecessary re-renders.
  - **Efficient Updates**: Custom hooks manage state updates to avoid cascading renders.
- **Accessibility (a11y)**:
  - Full keyboard navigation support (Focus rings, Skip links).
  - Screen reader friendly (ARIA labels, semantic HTML).
  - WCAG 2.1 compliant.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS (Utility-first)
- **Routing**: React Router DOM (SPA Routing)
- **State Management**: React Hooks (useState, useMemo, useCallback)
- **Testing**: Jest, React Testing Library
- **Deployment**: Vercel

## 🚀 Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/aswathisunilkumar/employee-dashboard.git
   cd employee-dashboard
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run development server**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

## 🧪 Available Scripts

| Script       | Command              | Description                         |
| ------------ | -------------------- | ----------------------------------- |
| Dev Server   | `npm run dev`        | Start local development server      |
| Build        | `npm run build`      | Type-check and build for production |
| Test         | `npm test`           | Run all tests with Jest             |
| Test (Watch) | `npm run test:watch` | Run tests in watch mode             |
| Lint         | `npm run lint`       | Run ESLint                          |
| Format       | `npm run format`     | Format code with Prettier           |

## 🏗️ Project Structure

```
src/
├── components/          # Shared UI components (Spinner, ErrorMessage)
├── features/            # Feature-based modules
│   └── employees/       # Employee domain logic
│       ├── components/  # List, Filters, Chart, Detail
│       ├── hooks/       # Custom hooks (useEmployees, useEmployeeFilters)
│       ├── types/       # TypeScript interfaces
│       └── data/        # Mock API and data
├── pages/               # Route pages (EmployeesPage, EmployeeDetailPage)
└── test/                # Test setup and utilities
```
