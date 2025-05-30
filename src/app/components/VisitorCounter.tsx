// src/app/components/VisitorCounter.tsx
// Update import dan hook usage

import { useState } from 'react';
import { Eye, Users, Calendar, TrendingUp, RefreshCw } from 'lucide-react';
import { useVisitorCounter } from '@/hooks/useVisitorCounter';

interface VisitorCounterProps {
  compact?: boolean;
  showRefresh?: boolean;
}

export default function VisitorCounter({ compact = false, showRefresh = false }: VisitorCounterProps) {
  // Pilih hook yang ingin digunakan:
  // useVisitorCounter() - Full featured dengan unique visitor tracking
  // useSimpleVisitorCounter() - Simpler, lebih reliable
  const { data, loading, error, refetch } = useVisitorCounter();
  
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Format number dengan K, M notation
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (loading) {
    return (
      <div className={`${compact ? 'p-3' : 'p-4'} bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm`}>
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
          <span className="text-sm text-slate-600 dark:text-slate-400">Loading visitors...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${compact ? 'p-3' : 'p-4'} bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 shadow-sm`}>
        <div className="flex items-center justify-center space-x-2">
          <Eye size={16} className="text-amber-500" />
          <span className="text-sm text-amber-600 dark:text-amber-400">
            {error.includes('CountAPI') ? 'Using cached data' : 'Service temporarily unavailable'}
          </span>
        </div>
      </div>
    );
  }

  if (!data) return null;

  if (compact) {
    return (
      <div className="flex items-center space-x-4 text-slate-600 dark:text-slate-400 text-sm">
        <div className="flex items-center space-x-1">
          <Eye size={14} className="text-blue-500" />
          <span>{formatNumber(data.totalVisitors)} visits</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users size={14} className="text-green-500" />
          <span>{formatNumber(data.uniqueVisitors)} unique</span>
        </div>
        {showRefresh && (
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center space-x-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
          <TrendingUp size={20} className="text-blue-500" />
          <span>Live Analytics</span>
        </h4>
        {showRefresh && (
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
            title="Refresh data"
          >
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Visitors */}
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Eye size={18} className="text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wide">
              Total Visits
            </span>
          </div>
          <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
            {formatNumber(data.totalVisitors)}
          </div>
        </div>

        {/* Unique Visitors */}
        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Users size={18} className="text-green-600 dark:text-green-400" />
            <span className="text-xs font-medium text-green-700 dark:text-green-300 uppercase tracking-wide">
              Unique Visitors
            </span>
          </div>
          <div className="text-2xl font-bold text-green-700 dark:text-green-300">
            {formatNumber(data.uniqueVisitors)}
          </div>
        </div>

        {/* Today's Visitors */}
        <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Calendar size={18} className="text-orange-600 dark:text-orange-400" />
            <span className="text-xs font-medium text-orange-700 dark:text-orange-300 uppercase tracking-wide">
              Today
            </span>
          </div>
          <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
            {formatNumber(data.todayVisitors)}
          </div>
        </div>
      </div>

      {/* New Visitor Welcome Message */}
      {data.isNewVisitor && data.message && (
        <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-2xl">🎉</span>
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              {data.message}
            </span>
          </div>
        </div>
      )}

      {/* Status Indicator */}
      <div className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Powered by CountAPI • Real-time data</span>
        </div>
      </div>
    </div>
  );
}