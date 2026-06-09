"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

interface InfoItem {
  title: string;
  content: string;
  tips?: string[];
}

const infoItems: InfoItem[] = [
  {
    title: "Why does this matter?",
    content:
      "Transportation accounts for about 29% of US greenhouse gas emissions, with passenger vehicles being a major contributor. Every mile driven releases CO₂ into the atmosphere, trapping heat and contributing to climate change.",
    tips: [
      "1 kg of CO₂ is roughly equivalent to driving 2.5 miles solo",
      "The average American produces about 16 metric tons of CO₂ per year",
      "Sports team travel can add 100-500+ kg of CO₂ per player per season",
    ],
  },
  {
    title: "How is this calculated?",
    content:
      "We use the EPA estimate of 404 grams of CO₂ per mile for an average passenger vehicle. This is divided by carpool size since sharing a ride splits the emissions between passengers. The calculation accounts for round-trip travel.",
  },
  {
    title: "Easy ways to reduce your impact",
    content: "Small changes in how your team travels can make a big difference over a season.",
    tips: [
      "Carpool more: Going from 2 to 4 people per car cuts emissions in half",
      "Combine trips: Can you practice at a closer location some weeks?",
      "Choose closer tournaments when possible",
      "Consider team buses for larger events (more efficient per person)",
      "Track your progress: Awareness alone often leads to better choices",
    ],
  },
];

export function InfoSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-foreground flex items-center gap-2">
          <svg
            className="h-5 w-5 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          About
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Understanding your team&apos;s carbon footprint is the first step toward reducing it. 
          Travel is often the biggest source of emissions for club sports, but small changes in 
          how you get to practices and tournaments can add up to a significant impact over a season.
        </p>
        <div className="space-y-2">
        {infoItems.map((item, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <div
              key={index}
              className="rounded-lg border border-border overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium text-foreground">{item.title}</span>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.content}
                  </p>
                  {item.tips && (
                    <ul className="space-y-2">
                      {item.tips.map((tip, tipIndex) => (
                        <li
                          key={tipIndex}
                          className="flex items-start gap-2 text-sm text-foreground"
                        >
                          <span className="text-primary mt-1">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          );
        })}
        </div>
      </CardContent>
    </Card>
  );
}
