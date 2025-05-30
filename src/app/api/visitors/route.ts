// src/app/api/visitors/route.ts
import { NextRequest, NextResponse } from 'next/server';


// Helper function untuk generate visitor ID
function generateVisitorId(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  const userAgent = request.headers.get('user-agent') || '';
  
  return Buffer.from(`${ip}-${userAgent}`).toString('base64').slice(0, 16);
}

// CountAPI wrapper untuk server-side
const countapi = {
  hit: async (namespace: string, key: string) => {
    const response = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
    return response.json();
  },
  
  get: async (namespace: string, key: string) => {
    const response = await fetch(`https://api.countapi.xyz/get/${namespace}/${key}`);
    return response.json();
  },
  
  set: async (namespace: string, key: string, value: number) => {
    const response = await fetch(`https://api.countapi.xyz/set/${namespace}/${key}?value=${value}`);
    return response.json();
  },
  
  update: async (namespace: string, key: string, amount: number = 1) => {
    const response = await fetch(`https://api.countapi.xyz/update/${namespace}/${key}?amount=${amount}`);
    return response.json();
  }
};

export async function GET(request: NextRequest) {
  try {
    const namespace = 'satriadhm-portfolio';
    const visitorId = generateVisitorId(request);
    
    // Track total visitors
    const totalResult = await countapi.hit(namespace, 'total-visitors');
    
    // Check if this visitor is unique (simplified approach)
    const visitorKey = `visitor-${visitorId}`;
    let isNewVisitor = false;
    
    try {
      // Try to get existing visitor
      const existingVisitor = await countapi.get(namespace, visitorKey);
      
      if (existingVisitor.value === null || existingVisitor.value === 0) {
        // New visitor
        await countapi.set(namespace, visitorKey, 1);
        await countapi.hit(namespace, 'unique-visitors');
        isNewVisitor = true;
      }
    } catch {
      // If error, assume new visitor
      await countapi.set(namespace, visitorKey, 1);
      await countapi.hit(namespace, 'unique-visitors');
      isNewVisitor = true;
    }
    
    // Get unique visitors count
    const uniqueResult = await countapi.get(namespace, 'unique-visitors');
    
    // Handle today's visitors (reset daily)
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const todayKey = `today-${today}`;
    
    let todayResult;
    if (isNewVisitor) {
      todayResult = await countapi.hit(namespace, todayKey);
    } else {
      todayResult = await countapi.get(namespace, todayKey);
    }
    
    return NextResponse.json({
      totalVisitors: totalResult.value || 0,
      uniqueVisitors: uniqueResult.value || 0,
      todayVisitors: todayResult.value || 0,
      isNewVisitor,
      message: isNewVisitor ? 'Welcome! Thanks for visiting my portfolio!' : 'Welcome back!'
    });
    
  } catch (error) {
    console.error('Error with CountAPI:', error);
    
    // Fallback response
    return NextResponse.json({
      totalVisitors: 1250 + Math.floor(Math.random() * 100),
      uniqueVisitors: 820 + Math.floor(Math.random() * 50),
      todayVisitors: 35 + Math.floor(Math.random() * 15),
      isNewVisitor: false,
      error: 'Using fallback data'
    });
  }
}

export async function POST(request: NextRequest) {
  // Same logic for POST
  return GET(request);
}