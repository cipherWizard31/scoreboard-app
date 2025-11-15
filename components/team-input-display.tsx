import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";


const TeamDisplay = () => {

     const [open, setOpen] = useState(false);
      const [homeTeam, setHomeTeam] = useState("");
      const [awayTeam, setAwayTeam] = useState("");
      const [error, setError] = useState("");
      const [submitted, setSubmitted] = useState(false);
    
      // Automatically open dialog on load
      useEffect(() => {
        setOpen(true);
      }, []);
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        
        if (!homeTeam.trim() || !awayTeam.trim()) {
          setError("Both team names are required!");
          return;
        }
        if (homeTeam == awayTeam) {
          setError("Team names can't be the same!");
          return;
        }
        // Mark as submitted, close dialog
        setError("");
        setOpen(false);
        setSubmitted(true);
      };
    
  return (
    <div>
        {/* Dialog for entering team names */}
      <Dialog
        open={open}
        onOpenChange={(value) => {
          if (!homeTeam.trim() || !awayTeam.trim()) return;
          setOpen(value);
        }}
      >
        <DialogContent
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Enter Team Names</DialogTitle>
            <DialogDescription>
              Please enter both team names to start the match.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium">Home Team</label>
              <Input
                value={homeTeam}
                onChange={(e) => setHomeTeam(e.target.value)}
                placeholder="Enter home team name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Away Team</label>
              <Input
                value={awayTeam}
                onChange={(e) => setAwayTeam(e.target.value)}
                placeholder="Enter away team name"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full mt-2">
              Start Match
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Once submitted, show the scoreboard header */}
      {submitted && (
        <div className="text-center mt-8">
          <h1 className="text-3xl font-bold mb-2">🏟️ Matchday</h1>
          <div className="flex items-center justify-center gap-6 text-2xl font-semibold">
            <span className="">{homeTeam}</span>
            <span>vs</span>
            <span className="">{awayTeam}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeamDisplay;