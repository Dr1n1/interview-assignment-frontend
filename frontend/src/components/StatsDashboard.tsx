import React from 'react';
import { useUserStore } from '../store/userStore';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const StatsDashboard: React.FC = () => {
  const { getStats, users, chartColors } = useUserStore();
  const stats = getStats();

  const genderData = Object.entries(stats.byGender).map(([name, value]) => ({
    name,
    value,
  }));

  if (users.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome, Let's dive into your personalized setup guide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Users</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.total}</div>
        </div>
        {(() => {
          const maleCount = stats.byGender['Male'] || 0;
          const femaleCount = stats.byGender['Female'] || 0;
          const otherCount = Object.entries(stats.byGender)
            .filter(([gender]) => gender !== 'Male' && gender !== 'Female')
            .reduce((sum, [, count]) => sum + count, 0);
          
          return (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Male</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{maleCount}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Female</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{femaleCount}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Other</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{otherCount}</div>
              </div>
            </>
          );
        })()}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Gender Distribution (Bar Chart)
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300} minHeight={300}>
            <BarChart data={genderData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill={chartColors.barChart} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Gender Distribution (Pie Chart)
            </h3>
          </div>
          {genderData.length > 0 ? (
            <div className="w-full h-[300px] min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {genderData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={chartColors.pieChartColors[index % chartColors.pieChartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-600 dark:text-gray-400">
              No data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
