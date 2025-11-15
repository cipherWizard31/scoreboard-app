"use client";

import Countdown from "@/components/count-down";
import TeamDisplay from "@/components/team-input-display";

export default function ScoreboardSetup() {
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <Countdown />
      <TeamDisplay />
    </div>
  );
}
