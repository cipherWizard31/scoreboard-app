"use client";

import { useState } from "react";
import { useTimer } from "./TimerContext";
import { Button } from "./ui/button";

type Stats = {
  goals: number;
  shots: number;
  shotsOnTarget: number;
  possession: number;
  fouls: number;
  yellowCards: number;
  redCards: number;
  offsides: number;
  corners: number;
};

type TeamData = {
  name: string;
  stats: Stats;
};

const defaultStats: Stats = {
  goals: 0,
  shots: 0,
  shotsOnTarget: 0,
  possession: 50,
  fouls: 0,
  yellowCards: 0,
  redCards: 0,
  offsides: 0,
  corners: 0,
};

export default function StatsBoard() {
  const { isRunning } = useTimer();

  const [home, setHome] = useState<TeamData>({
    name: "Home",
    stats: { ...defaultStats },
  });

  const [away, setAway] = useState<TeamData>({
    name: "Away",
    stats: { ...defaultStats },
  });

  function updateStat(team: "home" | "away", stat: keyof Stats, delta: number) {
    const setter = team === "home" ? setHome : setAway;
    const oppositeSetter = team === "home" ? setAway : setHome;

    setter((prev) => {
      const updatedValue = Math.max(0, prev.stats[stat] + delta);
      const updatedStats = { ...prev.stats, [stat]: updatedValue };

      // 1. If Goals increase → increment shots & shotsOnTarget
      if (stat === "goals" && delta > 0) {
        updatedStats.shots += 1;
        updatedStats.shotsOnTarget += 1;
      }

      return { ...prev, stats: updatedStats };
    });

    // 2. Possession is zero-sum – adjust the opposing team automatically
    if (stat === "possession") {
      oppositeSetter((prev) => {
        const newValue = Math.max(
          0,
          Math.min(100, prev.stats.possession - delta)
        );
        return {
          ...prev,
          stats: { ...prev.stats, possession: newValue },
        };
      });
    }
  }

  // 3. Export Stats → TXT file
  function exportStats() {
    const text = `
${home.name} Stats
-------------------
Goals: ${home.stats.goals}
Shots: ${home.stats.shots}
Shots on Target: ${home.stats.shotsOnTarget}
Possession: ${home.stats.possession}%
Fouls: ${home.stats.fouls}
Yellow Cards: ${home.stats.yellowCards}
Red Cards: ${home.stats.redCards}
Offsides: ${home.stats.offsides}
Corners: ${home.stats.corners}

${away.name} Stats
-------------------
Goals: ${away.stats.goals}
Shots: ${away.stats.shots}
Shots on Target: ${away.stats.shotsOnTarget}
Possession: ${away.stats.possession}%
Fouls: ${away.stats.fouls}
Yellow Cards: ${away.stats.yellowCards}
Red Cards: ${away.stats.redCards}
Offsides: ${away.stats.offsides}
Corners: ${away.stats.corners}
`;

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "match-stats.txt";
    a.click();

    URL.revokeObjectURL(url);
  }

  const statsList = [
    { key: "goals", label: "Goals" },
    { key: "shots", label: "Shots" },
    { key: "shotsOnTarget", label: "Shots on target" },
    { key: "possession", label: "Possession" },
    { key: "fouls", label: "Fouls" },
    { key: "yellowCards", label: "Yellow cards" },
    { key: "redCards", label: "Red cards" },
    { key: "offsides", label: "Offsides" },
    { key: "corners", label: "Corners" },
  ] as const;

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 text-center">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=description"
      />
      <span className="text-3xl w-full text-center">Stats</span>

      {statsList.map((stat) => (
        <div
          key={stat.key}
          className="grid grid-cols-3 gap-10 items-center py-3 border-b border-white/10"
        >
          {/* Home side */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => updateStat("home", stat.key, -1)}
              className="px-2 py-1 bg-red-600 rounded"
              disabled={!isRunning}
            >
              –
            </button>

            <span className="text-lg w-8 text-center">
              {home.stats[stat.key]}
            </span>

            <button
              onClick={() => updateStat("home", stat.key, 1)}
              className="px-2 py-1 bg-green-600 rounded"
              disabled={!isRunning}
            >
              +
            </button>
          </div>

          {/* Label */}
          <div className="text-center text-sm opacity-70">{stat.label}</div>

          {/* Away side */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => updateStat("away", stat.key, -1)}
              className="px-2 py-1 bg-red-600 rounded"
              disabled={!isRunning}
            >
              –
            </button>

            <span className="text-lg w-8 text-center">
              {away.stats[stat.key]}
            </span>

            <button
              onClick={() => updateStat("away", stat.key, 1)}
              className="px-2 py-1 bg-green-600 rounded"
              disabled={!isRunning}
            >
              +
            </button>
          </div>
        </div>
      ))}

      {/* Export Button */}
      <Button onClick={exportStats} className=" my-5">
        <span className="material-symbols-outlined">description</span>
        Export Stats
      </Button>
    </div>
  );
}
