"use client";

import { createContext, useContext, useState, Dispatch, SetStateAction } from "react";

// 1. Create a type for your context value
type TimerContextType = {
  isRunning: boolean;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
};

// 2. Initialize the context with a union type (value or null)
const TimerContext = createContext<TimerContextType | null>(null);

// 3. Provider component with the actual value
export function TimerProvider({ children }: any) {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <TimerContext.Provider value={{ isRunning, setIsRunning }}>
      {children}
    </TimerContext.Provider>
  );
}

// 4. Custom hook with a runtime check
export function useTimer() {
  const ctx = useContext(TimerContext);
  if (!ctx) {
    throw new Error("useTimer must be used inside a TimerProvider");
  }
  return ctx;
}
