"use client"

import { useState } from "react"

type Stats = {
  shots: number
  shotsOnTarget: number
  possession: number
  fouls: number
  yellowCards: number
  redCards: number
  offsides: number
  corners: number
}

type TeamData = {
  name: string
  stats: Stats
}

const defaultStats: Stats = {
  shots: 0,
  shotsOnTarget: 0,
  possession: 50,
  fouls: 0,
  yellowCards: 0,
  redCards: 0,
  offsides: 0,
  corners: 0
}

export default function StatsBoard() {
  const [home, setHome] = useState<TeamData>({
    name: "Home",
    stats: { ...defaultStats }
  })

  const [away, setAway] = useState<TeamData>({
    name: "Away",
    stats: { ...defaultStats }
  })

  function updateStat(
    team: "home" | "away",
    stat: keyof Stats,
    delta: number
  ) {
    if (team === "home") {
      setHome(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          [stat]: Math.max(0, prev.stats[stat] + delta)
        }
      }))
    } else {
      setAway(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          [stat]: Math.max(0, prev.stats[stat] + delta)
        }
      }))
    }
  }

  const statsList: { key: keyof Stats; label: string }[] = [
    { key: "shots", label: "Shots" },
    { key: "shotsOnTarget", label: "Shots on target" },
    { key: "possession", label: "Possession" },
    { key: "fouls", label: "Fouls" },
    { key: "yellowCards", label: "Yellow cards" },
    { key: "redCards", label: "Red cards" },
    { key: "offsides", label: "Offsides" },
    { key: "corners", label: "Corners" }
  ]

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 text-center">
      <span className="text-3xl w-full text-center">Stats</span>

      {statsList.map(stat => (
        <div
          key={stat.key}
          className="grid grid-cols-3 gap-10 items-center py-3 border-b border-white/10"
        >
          {/* Home side */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => updateStat("home", stat.key, -1)}
              className="px-2 py-1 bg-red-600 rounded"
            >
              –
            </button>
            <span className="text-lg w-8 text-center">
              {home.stats[stat.key]}
            </span>
            <button
              onClick={() => updateStat("home", stat.key, 1)}
              className="px-2 py-1 bg-green-600 rounded"
            >
              +
            </button>
          </div>

          {/* Label */}
          <div className="text-center text-sm opacity-70">
            {stat.label}
          </div>

          {/* Away side */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => updateStat("away", stat.key, -1)}
              className="px-2 py-1 bg-red-600 rounded"
            >
              –
            </button>
            <span className="text-lg w-8 text-center">
              {away.stats[stat.key]}
            </span>
            <button
              onClick={() => updateStat("away", stat.key, 1)}
              className="px-2 py-1 bg-green-600 rounded"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
