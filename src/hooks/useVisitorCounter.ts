// src/hooks/useVisitorCounter.ts
import { useState, useEffect } from 'react';

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

  const fetchVisitorData = async (method: 'GET' | 'POST' = 'GET') => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/visitors', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        // Tambah cache busting untuk memastikan request fresh
        cache: 'no-cache'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: VisitorData = await response.json();
      setData(result);
    } catch (err) {
      console.error('Error fetching visitor data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch visitor data');
      
      // Fallback data jika API gagal
      setData({
        totalVisitors: 1200 + Math.floor(Math.random() * 100), // Fallback dengan random
        uniqueVisitors: 800 + Math.floor(Math.random() * 50),
        todayVisitors: 25 + Math.floor(Math.random() * 15)
      });
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchVisitorData('GET');
  };

  useEffect(() => {
    // Track visitor on first load dengan POST
    fetchVisitorData('POST');

    // Set up interval untuk update data setiap 5 menit
    const interval = setInterval(() => {
      fetchVisitorData('GET');
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, refetch };
}

// Hook alternatif menggunakan external service (jika diperlukan)
export function useExternalVisitorCounter(): VisitorCounterHook {
  const [data, setData] = useState<VisitorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExternalData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Contoh menggunakan API gratis seperti countapi.xyz
      const response = await fetch('https://api.countapi.xyz/hit/satriadhm-portfolio/visits');
      
      if (!response.ok) {
        throw new Error('Failed to fetch from external API');
      }

      const result = await response.json();
      
      setData({
        totalVisitors: result.value || 0,
        uniqueVisitors: Math.floor((result.value || 0) * 0.7), // Estimasi
        todayVisitors: Math.floor(Math.random() * 50) + 10 // Mock today visitors
      });
    } catch (err) {
      console.error('Error fetching external visitor data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch visitor data');
      
      // Fallback
      setData({
        totalVisitors: 1250,
        uniqueVisitors: 820,
        todayVisitors: 35
      });
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchExternalData();
  };

  useEffect(() => {
    fetchExternalData();
    
    // Update every 10 minutes untuk external API
    const interval = setInterval(fetchExternalData, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, refetch };
}