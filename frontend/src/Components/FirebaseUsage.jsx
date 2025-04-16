import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FirebaseUsage = () => {
  const [usageStats, setUsageStats] = useState({
    authUsers: {
      total: 256,
      activeToday: 45,
      newThisMonth: 28,
      online: 12
    },
    storage: {
      used: '2.4',
      total: '5',
      files: 1250
    },
    database: {
      reads: '15.2K',
      writes: '8.7K',
      lastSync: new Date().toISOString()
    },
    bandwidth: {
      used: '45.8',
      total: '100',
      peak: '12.3'
    }
  });

  const [dailyActiveUsers, setDailyActiveUsers] = useState([]);
  const [monthlyActiveUsers, setMonthlyActiveUsers] = useState([]);

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#1f2937',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 10,
        displayColors: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6'
        },
        ticks: {
          font: {
            size: 12
          },
          stepSize: 50
        }
      }
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 2
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 6
      }
    }
  };

  // Create chart data
  const createChartData = (data, label) => ({
    labels: data.map(d => d.date),
    datasets: [
      {
        label,
        data: data.map(d => d.count),
        borderColor: '#4f46e5',
        backgroundColor: '#eef2ff',
        fill: false
      }
    ]
  });

  // Sample data - In a real app, you would fetch this from Firebase
  useEffect(() => {
    // Generate sample data for the last 30 days
    const today = new Date();
    const dailyData = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(today - i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      count: Math.floor(Math.random() * 200) + 100
    })).reverse();

    // Generate sample data for the last 12 months
    const monthlyData = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        count: Math.floor(Math.random() * 1000) + 500
      };
    }).reverse();

    setDailyActiveUsers(dailyData);
    setMonthlyActiveUsers(monthlyData);
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Firebase Usage Statistics</h2>
        <p className="text-sm text-gray-600">Monitor your Firebase service usage and quotas</p>
      </div>

      {/* User Activity Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Daily Active Users Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Daily Active Users</h3>
            <span className="text-sm font-medium text-indigo-600">
              Peak: {Math.max(...dailyActiveUsers.map(d => d.count))} users
            </span>
          </div>
          <div className="h-64">
            <Line options={chartOptions} data={createChartData(dailyActiveUsers, 'Daily Active Users')} />
          </div>
        </div>

        {/* Monthly Active Users Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Monthly Active Users</h3>
            <span className="text-sm font-medium text-indigo-600">
              Peak: {Math.max(...monthlyActiveUsers.map(d => d.count))} users
            </span>
          </div>
          <div className="h-64">
            <Line options={chartOptions} data={createChartData(monthlyActiveUsers, 'Monthly Active Users')} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Authentication Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800">Authentication</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Users</span>
              <span className="font-semibold">{usageStats.authUsers.total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Currently Online</span>
              <span className="font-semibold">{usageStats.authUsers.online}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Today</span>
              <span className="font-semibold">{usageStats.authUsers.activeToday}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">New This Month</span>
              <span className="font-semibold">{usageStats.authUsers.newThisMonth}</span>
            </div>
          </div>
        </div>

        {/* Storage Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800">Storage</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600">Storage Used</span>
                <span className="font-semibold">{usageStats.storage.used}GB / {usageStats.storage.total}GB</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${(parseFloat(usageStats.storage.used) / parseFloat(usageStats.storage.total)) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Files</span>
              <span className="font-semibold">{usageStats.storage.files}</span>
            </div>
          </div>
        </div>

        {/* Database Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800">Database</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Reads</span>
              <span className="font-semibold">{usageStats.database.reads}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Writes</span>
              <span className="font-semibold">{usageStats.database.writes}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Last Sync</span>
              <span className="font-semibold">{new Date(usageStats.database.lastSync).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Bandwidth Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800">Bandwidth</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600">Bandwidth Used</span>
                <span className="font-semibold">{usageStats.bandwidth.used}GB / {usageStats.bandwidth.total}GB</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-600 h-2 rounded-full" 
                  style={{ width: `${(parseFloat(usageStats.bandwidth.used) / parseFloat(usageStats.bandwidth.total)) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Peak Usage</span>
              <span className="font-semibold">{usageStats.bandwidth.peak} GB/day</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirebaseUsage; 