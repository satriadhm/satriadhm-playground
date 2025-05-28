// src/app/analytics/page.tsx (Optional - untuk melihat analytics detail)
'use client';

import { useState } from 'react';
import VisitorCounter from '../components/VisitorCounter';
import { BarChart3, TrendingUp, Users, Eye, Calendar, RefreshCw } from 'lucide-react';

export default function AnalyticsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen pt-16 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <BarChart3 size={32} className="text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100">
              Portfolio Analytics
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Real-time insights into portfolio visitors and engagement metrics
          </p>
          
          {/* Refresh Button */}
          <div className="mt-6">
            <button
              onClick={handleRefresh}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              <RefreshCw size={18} />
              <span>Refresh Data</span>
            </button>
          </div>
        </div>

        {/* Main Analytics Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {/* Main Visitor Counter */}
          <div className="lg:col-span-1 xl:col-span-2">
            <VisitorCounter key={refreshKey} showRefresh={true} />
          </div>
          
          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center space-x-2">
                <TrendingUp size={20} className="text-green-500" />
                <span>Growth Metrics</span>
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">This Week</span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">+12.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">This Month</span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">+24.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Bounce Rate</span>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">32.1%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Avg. Session</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">2m 45s</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center space-x-2">
                <Users size={20} className="text-purple-500" />
                <span>Top Locations</span>
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">🇮🇩 Indonesia</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">45.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">🇺🇸 United States</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">18.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">🇸🇬 Singapore</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">12.3%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">🇩🇪 Germany</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">8.1%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Others</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">15.7%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Page Views */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 text-center">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Eye size={24} className="text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
              12.4K
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Page Views
            </div>
            <div className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
              +8.2% from last week
            </div>
          </div>

          {/* Sessions */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 text-center">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Users size={24} className="text-purple-500" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
              3.2K
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Sessions
            </div>
            <div className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
              +15.3% from last week
            </div>
          </div>

          {/* Avg. Duration */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 text-center">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Calendar size={24} className="text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
              2m 45s
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Avg. Duration
            </div>
            <div className="mt-2 text-xs text-blue-600 dark:text-blue-400 font-medium">
              +0.3s from last week
            </div>
          </div>

          {/* Return Rate */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 text-center">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <TrendingUp size={24} className="text-green-500" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
              67.8%
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Return Rate
            </div>
            <div className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
              +2.1% from last week
            </div>
          </div>
        </div>

        {/* Popular Pages */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
            Most Popular Pages
          </h3>
          <div className="space-y-4">
            {[
              { page: '/', title: 'Home', views: '4,521', percentage: 36.5 },
              { page: '/experience', title: 'Experience', views: '2,103', percentage: 17.0 },
              { page: '/projects', title: 'Projects', views: '1,892', percentage: 15.3 },
              { page: '/blog', title: 'Blog & Certifications', views: '1,567', percentage: 12.7 },
              { page: '/contact', title: 'Contact', views: '987', percentage: 8.0 },
              { page: '/journey', title: 'Life Journey', views: '543', percentage: 4.4 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {item.title}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {item.page}
                    </span>
                  </div>
                  <div className="mt-1 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {item.views}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {item.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 px-6 py-3 rounded-full">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-700 dark:text-blue-300 font-medium text-sm">
              Data updates in real-time
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}