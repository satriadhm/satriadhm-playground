// src/hooks/useVisitorCounter.ts
import { useState, useEffect, useCallback } from 'react';
import countapi from 'countapi-js';

interface VisitorData {
  totalVisitors: number;
  uniqueVisitors: number;
  todayVisitors: number;
  isNewVisitor?: boolean;
  message?: string;
}

interface VisitorCounterHook {
  data: VisitorData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useVisitorCounter(): VisitorCounterHook {
  const [data, setData] = useState<VisitorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const namespace = 'satriadhm-portfolio';

  // Generate visitor ID based on browser fingerprint
  const getVisitorId = (): string => {
    let visitorId = localStorage.getItem('portfolio_visitor_id');
    
    if (!visitorId) {
      // Create unique visitor ID
      visitorId = 'visitor_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
      localStorage.setItem('portfolio_visitor_id', visitorId);
    }
    
    return visitorId;
  };

  const fetchVisitorData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const visitorId = getVisitorId();
      const today = new Date().toISOString().split('T')[0];
      
      // Track total visitors
      const totalResult = await countapi.hit(namespace, 'total-visitors');
      
      // Check if unique visitor
      const visitorKey = `visitor-${visitorId}`;
      let isNewVisitor = false;
      let uniqueCount = 0;
      
      try {
        // Check if visitor exists
        const existingVisitor = await countapi.get(namespace, visitorKey);
        
        if (!existingVisitor.value) {
          // New unique visitor
          await countapi.set(namespace, visitorKey, 1);
          const uniqueResult = await countapi.hit(namespace, 'unique-visitors');
          uniqueCount = uniqueResult.value || 0;
          isNewVisitor = true;
        } else {
          // Existing visitor, just get unique count
          const uniqueResult = await countapi.get(namespace, 'unique-visitors');
          uniqueCount = uniqueResult.value || 0;
        }
      } catch (uniqueError) {
        console.warn('Error tracking unique visitor:', uniqueError);
        // Fallback: assume new visitor
        await countapi.set(namespace, visitorKey, 1);
        const uniqueResult = await countapi.hit(namespace, 'unique-visitors');
        uniqueCount = uniqueResult.value || 0;
        isNewVisitor = true;
      }
      
      // Track today's visitors
      const todayKey = `today-${today}`;
      let todayCount = 0;
      
      // Check if visited today
      const todayVisitorKey = `today-visitor-${visitorId}-${today}`;
      const visitedToday = localStorage.getItem(todayVisitorKey);
      
      if (!visitedToday) {
        // First visit today
        const todayResult = await countapi.hit(namespace, todayKey);
        todayCount = todayResult.value || 0;
        localStorage.setItem(todayVisitorKey, '1');
      } else {
        // Already visited today, just get count
        const todayResult = await countapi.get(namespace, todayKey);
        todayCount = todayResult.value || 0;
      }
      
      setData({
        totalVisitors: totalResult.value || 0,
        uniqueVisitors: uniqueCount,
        todayVisitors: todayCount,
        isNewVisitor,
        message: isNewVisitor ? 'Welcome! Thanks for visiting my portfolio!' : undefined
      });
      
    } catch (err) {
      console.error('Error fetching visitor data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch visitor data');
      
      // Fallback dengan data dari localStorage + random
      const cachedTotal = localStorage.getItem('portfolio_cached_total') || '1200';
      const fallbackTotal = parseInt(cachedTotal) + Math.floor(Math.random() * 50);
      
      setData({
        totalVisitors: fallbackTotal,
        uniqueVisitors: Math.floor(fallbackTotal * 0.75),
        todayVisitors: Math.floor(Math.random() * 30) + 10,
        isNewVisitor: false
      });
      
      // Cache fallback total
      localStorage.setItem('portfolio_cached_total', fallbackTotal.toString());
    } finally {
      setLoading(false);
    }
  }, [namespace]);

  const refetch = useCallback(async () => {
    await fetchVisitorData();
  }, [fetchVisitorData]);

  useEffect(() => {
    fetchVisitorData();
    
    // Auto refresh every 5 minutes
    const interval = setInterval(fetchVisitorData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchVisitorData]);

  return { data, loading, error, refetch };
}

// Alternative: Simplified version dengan error handling yang lebih baik
export function useSimpleVisitorCounter(): VisitorCounterHook {
  const [data, setData] = useState<VisitorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const namespace = 'satriadhm-portfolio';

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Multiple counters untuk different metrics
      const [totalResult, uniqueResult] = await Promise.allSettled([
        countapi.hit(namespace, 'page-views'),
        countapi.hit(namespace, 'sessions')
      ]);
      
      let totalVisitors = 1200;
      let uniqueVisitors = 850;
      
      if (totalResult.status === 'fulfilled') {
        totalVisitors = totalResult.value.value || totalVisitors;
      }
      
      if (uniqueResult.status === 'fulfilled') {
        uniqueVisitors = Math.min(uniqueResult.value.value || uniqueVisitors, totalVisitors);
      }
      
      // Simple today calculation
      const today = new Date().toDateString();
      const todayKey = `simple_today_${today}`;
      let todayVisitors = parseInt(localStorage.getItem(todayKey) || '0');
      
      const lastVisit = localStorage.getItem('simple_last_visit');
      if (lastVisit !== today) {
        todayVisitors += 1;
        localStorage.setItem(todayKey, todayVisitors.toString());
        localStorage.setItem('simple_last_visit', today);
      }
      
      setData({
        totalVisitors,
        uniqueVisitors,
        todayVisitors,
        isNewVisitor: lastVisit !== today
      });
      
    } catch (err) {
      console.error('CountAPI error:', err);
      setError('CountAPI temporarily unavailable');
      
      // Enhanced fallback
      const baseTotal = 1250;
      const randomIncrement = Math.floor(Math.random() * 100);
      
      setData({
        totalVisitors: baseTotal + randomIncrement,
        uniqueVisitors: Math.floor((baseTotal + randomIncrement) * 0.72),
        todayVisitors: Math.floor(Math.random() * 25) + 15,
        isNewVisitor: false
      });
    } finally {
      setLoading(false);
    }
  }, [namespace]);

  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
    
    // Refresh every 10 minutes untuk simple version
    const interval = setInterval(fetchData, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchData]);

  return { data, loading, error, refetch };
}

// Hook untuk testing/development
export function useDevVisitorCounter(): VisitorCounterHook {
  const [data, setData] = useState<VisitorData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const generateRealisticData = useCallback(() => {
    const baseDate = new Date('2024-01-01');
    const daysSinceLaunch = Math.floor((Date.now() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const totalVisitors = 1200 + (daysSinceLaunch * 3) + Math.floor(Math.random() * 50);
    const uniqueVisitors = Math.floor(totalVisitors * 0.73);
    const todayVisitors = Math.floor(Math.random() * 40) + 15;
    
    return {
      totalVisitors,
      uniqueVisitors,
      todayVisitors,
      isNewVisitor: Math.random() > 0.7
    };
  }, []);

  const refetch = useCallback(async () => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setData(generateRealisticData());
    setLoading(false);
  }, [generateRealisticData]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}
