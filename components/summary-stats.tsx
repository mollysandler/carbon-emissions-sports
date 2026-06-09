"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSummaryStats } from "@/lib/emissions-data";

const icons = {
  leaf: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  trophy: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
          <span className="text-primary">{icons.trophy}</span>
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
