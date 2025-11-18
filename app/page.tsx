"use client";

import Countdown from "@/components/count-down";
import StatsBoard from "@/components/stats-board";
import TeamDisplay from "@/components/team-input-display";
import { TimerProvider } from "@/components/TimerContext";

export default function ScoreboardSetup() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen lg:w-full px-6 pt-4">
      <TimerProvider>
        <Countdown />
        <TeamDisplay />
        <StatsBoard />
      </TimerProvider>
    </div>
  );
}
