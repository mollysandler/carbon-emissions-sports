"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSummaryStats } from "@/lib/emissions-data";

const icons = {
  leaf: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21c0-5 2-11 9-13 5-1.5 9-1 9-1s.5 4-1 9c-2 7-8 9-13 9a8 8 0 01-4-1z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21c3-6 7-9 12-11" />
    </svg>
  ),
  users: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  car: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 17h8M8 17a2 2 0 01-2-2V9a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2M8 17v2a1 1 0 001 1h1a1 1 0 001-1v-2M16 17v2a1 1 0 001 1h1a1 1 0 001-1v-2M5 11l2-4h10l2 4" />
    </svg>
  ),
  route: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  ),
};

export function SummaryStats() {
  const stats = getSummaryStats();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total CO₂ Emissions
          </CardTitle>
          <span className="text-primary">{icons.leaf}</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {stats.totalCO2.toFixed(1)} kg
          </div>
          <p className="text-xs text-muted-foreground">
            Tournament: {stats.tournamentCO2.toFixed(1)} kg • Practice: {stats.practiceCO2.toFixed(1)} kg
          </p>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Miles Traveled
          </CardTitle>
          <span className="text-primary">{icons.route}</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {stats.totalMiles.toLocaleString()} mi
          </div>
          <p className="text-xs text-muted-foreground">
            Across {stats.totalTrips} trips
          </p>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Avg Carpool Size
          </CardTitle>
          <span className="text-primary">{icons.car}</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {stats.avgCarpoolSize.toFixed(1)} people
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.playerCount} players total
          </p>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Teams Tracked
          </CardTitle>
          <span className="text-primary">{icons.users}</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {stats.teamCount} teams
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.playerCount} total players
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
