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
          <div className="flex items-center justify-between gap-4">
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
                    d="M3 21c0-5 2-11 9-13 5-1.5 9-1 9-1s.5 4-1 9c-2 7-8 9-13 9a8 8 0 01-4-1z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 21c3-6 7-9 12-11"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  CO₂ Emissions Tracker
                </h1>
                <p className="text-sm text-muted-foreground">
                  Ultimate Frisbee Travel Impact
                </p>
              </div>
            </div>
            <a
              href="https://forms.gle/REPLACE_WITH_REAL_FORM"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Apply Here
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Info Section */}
          <section>
            <InfoSection />
          </section>

          {/* Summary Stats */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Overview</h2>
            <SummaryStats />
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
