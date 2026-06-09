"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPlayerEmissions, getTeamEmissions } from "@/lib/emissions-data";
import { ChevronDown, ChevronRight } from "lucide-react";

export function EmissionsTable() {
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const playerData = getPlayerEmissions();
  const teamData = getTeamEmissions();

  const sortedTeams = [...teamData].sort((a, b) => b.total - a.total);

  const toggleTeam = (teamId: string) => {
    setExpandedTeam(expandedTeam === teamId ? null : teamId);
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Team Emissions</CardTitle>
        <CardDescription>
          Click on a team to see individual player breakdowns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-8 text-muted-foreground"></TableHead>
              <TableHead className="text-muted-foreground">Team</TableHead>
              <TableHead className="text-right text-muted-foreground">Players</TableHead>
              <TableHead className="text-right text-muted-foreground">Tournament CO₂</TableHead>
              <TableHead className="text-right text-muted-foreground">Practice CO₂</TableHead>
              <TableHead className="text-right text-muted-foreground">Total CO₂</TableHead>
              <TableHead className="text-right text-muted-foreground">Avg per Player</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTeams.map((team, index) => {
              const isExpanded = expandedTeam === team.id;
              const teamPlayers = playerData
                .filter((p) => p.team === team.id)
                .sort((a, b) => b.total - a.total);

              return (
                <>
                  <TableRow
                    key={team.id}
                    className="border-border cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => toggleTeam(team.id)}
                  >
                    <TableCell className="text-muted-foreground">
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        {index === 0 && sortedTeams.length > 1 && (
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            Highest
                          </span>
                        )}
                        {index === sortedTeams.length - 1 && sortedTeams.length > 1 && (
                          <span className="inline-flex items-center rounded-full bg-chart-2/10 px-2 py-0.5 text-xs font-medium text-chart-2">
                            Lowest
                          </span>
                        )}
                        {team.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-foreground">{team.playerCount}</TableCell>
                    <TableCell className="text-right text-foreground">
                      {team.tournament.toFixed(2)} kg
                    </TableCell>
                    <TableCell className="text-right text-foreground">
                      {team.practice.toFixed(2)} kg
                    </TableCell>
                    <TableCell className="text-right font-semibold text-primary">
                      {team.total.toFixed(2)} kg
                    </TableCell>
                    <TableCell className="text-right text-foreground">
                      {team.avgPerPlayer.toFixed(2)} kg
                    </TableCell>
                  </TableRow>

                  {/* Expanded player rows */}
                  {isExpanded &&
                    teamPlayers.map((player, playerIndex) => (
                      <TableRow
                        key={player.id}
                        className="border-border bg-muted/30"
                      >
                        <TableCell></TableCell>
                        <TableCell className="pl-8 text-foreground">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">—</span>
                            {playerIndex === 0 && teamPlayers.length > 1 && (
                              <span className="inline-flex items-center rounded-full bg-chart-5/10 px-2 py-0.5 text-xs font-medium text-chart-5">
                                Highest
                              </span>
                            )}
                            {playerIndex === teamPlayers.length - 1 && teamPlayers.length > 1 && (
                              <span className="inline-flex items-center rounded-full bg-chart-2/10 px-2 py-0.5 text-xs font-medium text-chart-2">
                                Lowest
                              </span>
                            )}
                            {player.name}
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground text-sm">
                          {player.tripCount} trips
                        </TableCell>
                        <TableCell className="text-right text-foreground">
                          {player.tournament.toFixed(2)} kg
                        </TableCell>
                        <TableCell className="text-right text-foreground">
                          {player.practice.toFixed(2)} kg
                        </TableCell>
                        <TableCell className="text-right font-medium text-chart-3">
                          {player.total.toFixed(2)} kg
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    ))}
                </>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
