// src/app/api/visitors/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage (untuk production, gunakan database)
const visitorData = {
  totalVisitors: 10, // Starting count
  uniqueVisitors: new Set<string>(),
  todayVisitors: 0,
  lastResetDate: new Date().toDateString()
};

// Helper function untuk generate visitor ID
function generateVisitorId(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  const userAgent = request.headers.get('user-agent') || '';
  
  // Simple hash untuk privacy
  return Buffer.from(`${ip}-${userAgent}`).toString('base64').slice(0, 16);
}

// Reset daily counter jika hari sudah berganti
function resetDailyCounterIfNeeded() {
  const today = new Date().toDateString();
  if (visitorData.lastResetDate !== today) {
    visitorData.todayVisitors = 0;
    visitorData.lastResetDate = today;
  }
}

export async function GET(request: NextRequest) {
  try {
    resetDailyCounterIfNeeded();
    
    const visitorId = generateVisitorId(request);
    const isNewVisitor = !visitorData.uniqueVisitors.has(visitorId);
    
    // Track visitor
    if (isNewVisitor) {
      visitorData.uniqueVisitors.add(visitorId);
      visitorData.totalVisitors += 1;
      visitorData.todayVisitors += 1;
    }
    
    return NextResponse.json({
      totalVisitors: visitorData.totalVisitors,
      uniqueVisitors: visitorData.uniqueVisitors.size,
      todayVisitors: visitorData.todayVisitors,
      isNewVisitor
    });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return NextResponse.json(
      { error: 'Failed to track visitor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    resetDailyCounterIfNeeded();
    
    const visitorId = generateVisitorId(request);
    const isNewVisitor = !visitorData.uniqueVisitors.has(visitorId);
    
    // Track visitor dengan POST untuk lebih akurat
    if (isNewVisitor) {
      visitorData.uniqueVisitors.add(visitorId);
      visitorData.totalVisitors += 1;
      visitorData.todayVisitors += 1;
    }
    
    return NextResponse.json({
      totalVisitors: visitorData.totalVisitors,
      uniqueVisitors: visitorData.uniqueVisitors.size,
      todayVisitors: visitorData.todayVisitors,
      isNewVisitor,
      message: isNewVisitor ? 'Welcome, new visitor!' : 'Welcome back!'
    });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return NextResponse.json(
      { error: 'Failed to track visitor' },
      { status: 500 }
    );
  }
}