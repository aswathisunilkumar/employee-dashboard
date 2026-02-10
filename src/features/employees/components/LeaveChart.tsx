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

/**
 * Reusable chart component that visualises leave data as a simple bar chart.
 *
 * Why Recharts?
 * - React-native (components, not imperative canvas API)
 * - Lightweight for the subset we use (BarChart only)
 * - Declarative — easy to explain in an interview
 *
 * Wrapped in React.memo because:
 * - Chart rendering (SVG) is relatively expensive.
 * - If the parent re-renders but leaveBalance hasn't changed,
 *   memo skips both useMemo recalculation AND SVG re-render.
 */
export const LeaveChart = memo(function LeaveChart({
    leaveBalance,
}: LeaveChartProps) {
    // useMemo avoids rebuilding the data array when leaveBalance hasn't changed.
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
        [leaveBalance],
    );

    return (
        <div>
            <h3>Leave Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                    <XAxis dataKey="label" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="days" fill="#4f46e5" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
});

