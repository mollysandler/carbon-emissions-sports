// CO2 emissions constant: average grams CO2 per mile per person for a car
// Based on EPA estimate of ~404 grams CO2 per mile for average passenger vehicle
// Divided by carpool size to get per-person emissions
const CO2_GRAMS_PER_MILE = 404;

export interface TravelEntry {
  id: string;
  type: "tournament" | "practice";
  event: string;
  date: string;
  milesOneWay: number;
  carpoolSize: number;
  participants: string[];
}

export interface Player {
  id: string;
  name: string;
  team: string;
}

export interface Team {
  id: string;
  name: string;
}

// PLACEHOLDER DATA - Replace with real data
export const teams: Team[] = [
  { id: "team-1", name: "Team Alpha" },
  { id: "team-2", name: "Team Beta" },
];

export const players: Player[] = [
  { id: "player-1", name: "Player A", team: "team-1" },
  { id: "player-2", name: "Player B", team: "team-1" },
  { id: "player-3", name: "Player C", team: "team-1" },
  { id: "player-4", name: "Player D", team: "team-1" },
  { id: "player-5", name: "Player E", team: "team-2" },
  { id: "player-6", name: "Player F", team: "team-2" },
  { id: "player-7", name: "Player G", team: "team-2" },
  { id: "player-8", name: "Player H", team: "team-2" },
];

export const travelData: TravelEntry[] = [
  // PLACEHOLDER - Tournament travel
  {
    id: "t1",
    type: "tournament",
    event: "Fall Championship",
    date: "2024-10-15",
    milesOneWay: 150,
    carpoolSize: 4,
    participants: ["player-1", "player-2", "player-3", "player-4"],
  },
  {
    id: "t2",
    type: "tournament",
    event: "Regional Qualifier",
    date: "2024-11-02",
    milesOneWay: 85,
    carpoolSize: 3,
    participants: ["player-1", "player-2", "player-5", "player-6", "player-7"],
  },
  {
    id: "t3",
    type: "tournament",
    event: "State Finals",
    date: "2024-11-20",
    milesOneWay: 220,
    carpoolSize: 5,
    participants: ["player-1", "player-2", "player-3", "player-4", "player-5", "player-6", "player-7", "player-8"],
  },
  // PLACEHOLDER - Practice travel
  {
    id: "p1",
    type: "practice",
    event: "Weekly Practice",
    date: "2024-10-01",
    milesOneWay: 12,
    carpoolSize: 2,
    participants: ["player-1", "player-2", "player-3", "player-4"],
  },
  {
    id: "p2",
    type: "practice",
    event: "Weekly Practice",
    date: "2024-10-08",
    milesOneWay: 12,
    carpoolSize: 2,
    participants: ["player-1", "player-2", "player-3", "player-5", "player-6"],
  },
  {
    id: "p3",
    type: "practice",
    event: "Weekly Practice",
    date: "2024-10-15",
    milesOneWay: 12,
    carpoolSize: 3,
    participants: ["player-1", "player-2", "player-3", "player-4", "player-7", "player-8"],
  },
  {
    id: "p4",
    type: "practice",
    event: "Weekly Practice",
    date: "2024-10-22",
    milesOneWay: 12,
    carpoolSize: 2,
    participants: ["player-2", "player-3", "player-4", "player-5", "player-6", "player-7"],
  },
  {
    id: "p5",
    type: "practice",
    event: "Weekly Practice",
    date: "2024-10-29",
    milesOneWay: 12,
    carpoolSize: 2,
    participants: ["player-1", "player-3", "player-4", "player-5", "player-8"],
  },
];

// Calculate CO2 emissions in kg for a travel entry per person
export function calculateCO2(milesOneWay: number, carpoolSize: number): number {
  const totalMiles = milesOneWay * 2; // round trip
  const gramsPerPerson = (totalMiles * CO2_GRAMS_PER_MILE) / carpoolSize;
  return gramsPerPerson / 1000; // convert to kg
}

// Get emissions per player
export function getPlayerEmissions() {
  const emissions: Record<string, { tournament: number; practice: number; total: number }> = {};

  players.forEach((player) => {
    emissions[player.id] = { tournament: 0, practice: 0, total: 0 };
  });

  travelData.forEach((entry) => {
    const co2PerPerson = calculateCO2(entry.milesOneWay, entry.carpoolSize);
    entry.participants.forEach((playerId) => {
      if (emissions[playerId]) {
        if (entry.type === "tournament") {
          emissions[playerId].tournament += co2PerPerson;
        } else {
          emissions[playerId].practice += co2PerPerson;
        }
        emissions[playerId].total += co2PerPerson;
      }
    });
  });

  return players.map((player) => {
    const playerTrips = travelData.filter((t) => t.participants.includes(player.id));
    const lastUpdated = playerTrips.reduce(
      (latest, t) => (t.date > latest ? t.date : latest),
      "",
    );
    return {
      ...player,
      ...emissions[player.id],
      tripCount: playerTrips.length,
      lastUpdated,
    };
  });
}

// Get emissions per team
export function getTeamEmissions() {
  const playerEmissions = getPlayerEmissions();

  return teams.map((team) => {
    const teamPlayers = playerEmissions.filter((p) => p.team === team.id);
    const tournament = teamPlayers.reduce((sum, p) => sum + p.tournament, 0);
    const practice = teamPlayers.reduce((sum, p) => sum + p.practice, 0);
    const total = tournament + practice;
    const tripCount = teamPlayers.reduce((sum, p) => sum + p.tripCount, 0);
    const avgPerPlayer = teamPlayers.length > 0 ? total / teamPlayers.length : 0;
    const lastUpdated = teamPlayers.reduce(
      (latest, p) => (p.lastUpdated > latest ? p.lastUpdated : latest),
      "",
    );

    return {
      ...team,
      tournament,
      practice,
      total,
      tripCount,
      playerCount: teamPlayers.length,
      avgPerPlayer,
      lastUpdated,
    };
  });
}

// Get summary stats
export function getSummaryStats() {
  const playerEmissions = getPlayerEmissions();
  const totalCO2 = playerEmissions.reduce((sum, p) => sum + p.total, 0);
  const tournamentCO2 = playerEmissions.reduce((sum, p) => sum + p.tournament, 0);
  const practiceCO2 = playerEmissions.reduce((sum, p) => sum + p.practice, 0);
  const totalMiles = travelData.reduce((sum, t) => sum + t.milesOneWay * 2 * t.participants.length, 0);
  const avgCarpoolSize =
    travelData.reduce((sum, t) => sum + t.carpoolSize, 0) / travelData.length;

  return {
    totalCO2,
    tournamentCO2,
    practiceCO2,
    totalMiles,
    avgCarpoolSize,
    totalTrips: travelData.length,
    playerCount: players.length,
    teamCount: teams.length,
  };
}
