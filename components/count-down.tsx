"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showHalftimeModal, setShowHalftimeModal] = useState<boolean>(false);
  const [totalDuration, setTotalDuration] = useState<number>(0); // Track the total duration
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to set the duration of the countdown
  const handleSetDuration = (minutes: number): void => {
    const durationInSeconds = minutes * 60;
    setTimeLeft(durationInSeconds);
    setTotalDuration(durationInSeconds);
    setIsActive(false);
    setIsPaused(false);
    setShowHalftimeModal(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // Function to start the countdown timer
  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
  };

  // Function to pause the countdown timer
  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  // Function to reset the countdown timer
  const handleReset = (): void => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(0);
    setShowHalftimeModal(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // Function to close the halftime modal
  const handleCloseHalftimeModal = (): void => {
    setShowHalftimeModal(false);
    handleStart(); // Resume the timer after halftime
  };

  // useEffect hook to manage the countdown interval
  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          // Check if it's halftime
          if (prevTime === totalDuration / 2) {
            setIsPaused(true);
            setIsActive(false);
            setShowHalftimeModal(true);
            clearInterval(timerRef.current!);
          }

          // If time is up, clear the interval
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }

          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused, totalDuration]);

  // Function to format the time left into mm:ss format
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-min w-full mt-0">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
          Football Timer
        </h1>
        <div className="flex justify-center gap-4 mb-6">
          <Button
            onClick={() => handleSetDuration(30)}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            30 mins
          </Button>
          <Button
            onClick={() => handleSetDuration(60)}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            60 mins
          </Button>
          <Button
            onClick={() => handleSetDuration(90)}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            90 mins
          </Button>
        </div>
        <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
          {formatTime(timeLeft)}
        </div>
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleStart}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            {isPaused ? "Resume" : "Start"}
          </Button>
          <Button
            onClick={handlePause}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            Pause
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Halftime Modal */}
      {showHalftimeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Halftime!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Take a short break before resuming the game.
            </p>
            <Button
              onClick={handleCloseHalftimeModal}
              variant="outline"
              className="text-gray-800 dark:text-gray-200"
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}