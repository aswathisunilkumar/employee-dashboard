# Employee Dashboard 🚀

A modern, responsive, and accessible dashboard for managing employee records and visualizing leave data.

Deployed Application: [https://employee-dashboard-mu-seven.vercel.app](https://employee-dashboard-mu-seven.vercel.app)

## Features

- **Employee List**: searchable and filterable list of employees.
- **Detailed Profiles**: View comprehensive employee information.
- **Leave Analytics**: Visual bar chart of annual, sick, and used leave.
- **Accessible Design**: WCAG compliant with keyboard navigation and screen reader support.
- **Responsive**: Optimized for all screen sizes using Tailwind CSS.
- **Data Simulation**: Realistic mock API with latency simulation.

## Tech Stack

- **React 19** with **Vite**
- **TypeScript**
- **Tailwind CSS**
- **React Router**
- **Recharts**
- **Vitest** for testing

## Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/aswathisunilkumar/employee-dashboard.git
    cd employee-dashboard
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run development server**:
    ```bash
    npm run dev
    ```

4.  **Build for production**:
    ```bash
    npm run build
    ```

## Project Structure

- `src/features/employees`: Domain-specific components, hooks, and data.
- `src/components`: Shared UI components (Spinner, ErrorMessage).
- `src/pages`: Page-level container components.

## License

MIT
