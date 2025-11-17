"use client";

import Countdown from "@/components/count-down";
import StatsBoard from "@/components/stats-board";
import TeamDisplay from "@/components/team-input-display";

export default function ScoreboardSetup() {
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full pt-4">
      <Countdown />
      <TeamDisplay />
      <StatsBoard />
    </div>
  );
}
