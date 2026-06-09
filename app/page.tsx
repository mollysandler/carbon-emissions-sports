"use client";

import { SummaryStats } from "@/components/summary-stats";
import { EmissionsTable } from "@/components/emissions-table";
import { InfoSection } from "@/components/info-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  CO₂ Emissions Tracker
                </h1>
                <p className="text-sm text-muted-foreground">
                  Club Sports Travel Impact
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Summary Stats */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Overview</h2>
            <SummaryStats />
          </section>

          {/* Info Section */}
          <section>
            <InfoSection />
          </section>

          {/* Emissions Table */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Emissions Breakdown</h2>
            <EmissionsTable />
          </section>

          {/* Data Note */}
          <section className="rounded-lg border border-border bg-card/50 p-4">
            <p className="text-center text-sm text-muted-foreground">
              <span className="font-medium text-primary">PLACEHOLDER DATA</span> — This data is for demonstration purposes. 
              Replace the values in <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">lib/emissions-data.ts</code> with your actual travel records.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-muted-foreground">
            CO₂ calculations based on EPA estimate of 404g CO₂/mile for average passenger vehicles, divided by carpool size.
          </p>
        </div>
      </footer>
    </div>
  );
}
