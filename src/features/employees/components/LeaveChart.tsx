import { memo, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { Employee } from '../types/employee';

interface LeaveChartProps {
  leaveBalance: Employee['leaveBalance'];
}

/** Visualizes leave balance using a bar chart. */
export const LeaveChart = memo(({ leaveBalance }: LeaveChartProps) => {
  // Format data for the chart
  const chartData = useMemo(
    () => [
      { label: 'Annual', days: leaveBalance.annual },
      { label: 'Sick', days: leaveBalance.sick },
      { label: 'Used', days: leaveBalance.used },
      {
        label: 'Remaining',
        days: leaveBalance.annual + leaveBalance.sick - leaveBalance.used,
      },
    ],
    [leaveBalance]
  );

  const chartLabel = `Leave balance: ${leaveBalance.annual} Annual, ${leaveBalance.sick} Sick, ${leaveBalance.used} Used`;

  return (
    <div role="img" aria-label={chartLabel}>
      <h3
        className="mb-4 text-lg font-semibold text-[var(--color-text-heading)]"
        aria-hidden="true"
      >
        Leave Overview
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <XAxis dataKey="label" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="days" fill="var(--color-primary)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});
