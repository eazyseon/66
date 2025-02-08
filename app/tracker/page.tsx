"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Tracker() {
  const router = useRouter();

  const [goals, setGoals] = useState<{ id: string; title: string }[]>([]);
  const [checkedDays, setCheckedDays] = useState<Record<string, boolean[]>>({});

  useEffect(() => {
    const savedGoals = localStorage.getItem("goals");
    const savedCheckedDays = localStorage.getItem("checkedDays");

    if (!savedGoals) {
      router.push("/");
    } else {
      const parsedGoals = JSON.parse(savedGoals);
      setGoals(parsedGoals);

      const existingCheckedDays = savedCheckedDays
        ? JSON.parse(savedCheckedDays)
        : {};

      const updatedCheckedDays = { ...existingCheckedDays };
      parsedGoals.forEach((goal: { id: string }) => {
        if (!updatedCheckedDays[goal.id]) {
          updatedCheckedDays[goal.id] = Array(66).fill(false);
        }
      });

      setCheckedDays(updatedCheckedDays);
    }
  }, [router]);

  const canToggleDay = (goalId: string, index: number) => {
    const lastCheckedIndex = checkedDays[goalId]?.lastIndexOf(true) ?? -1;
    return index === lastCheckedIndex + 1;
  };

  const isAlreadyCheckedToday = (goalId: string): boolean => {
    const today = new Date().toISOString().split("T")[0];
    const lastCheckedDate = localStorage.getItem(`lastCheckedDate_${goalId}`);
    return today === lastCheckedDate;
  };

  const saveCheckedDays = (
    updatedCheckedDays: Record<string, boolean[]>,
    goalId: string
  ) => {
    localStorage.setItem("checkedDays", JSON.stringify(updatedCheckedDays));
    localStorage.setItem(
      `lastCheckedDate_${goalId}`,
      new Date().toISOString().split("T")[0]
    );
  };

  const toggleDay = (goalId: string, index: number) => {
    if (!canToggleDay(goalId, index) || isAlreadyCheckedToday(goalId)) return;

    const newCheckedDays = {
      ...checkedDays,
      [goalId]: [...(checkedDays[goalId] || Array(66).fill(false))],
    };
    newCheckedDays[goalId][index] = !newCheckedDays[goalId][index];

    setCheckedDays(newCheckedDays);
    saveCheckedDays(newCheckedDays, goalId);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      {goals.map((goal) => {
        const checkDaysCount =
          checkedDays[goal.id]?.filter(Boolean).length || 0;

        return (
          <div
            key={goal.id}
            className="mb-6 p-4 border rounded shadow-md w-full max-w-md">
            <h2 className="text-lg font-semibold mb-2 text-black">
              🎯 {goal.title}
            </h2>
            <h3 className="text-sm font-bold mb-2 text-orange-400">
              {checkDaysCount}번 해냄!
            </h3>
            <div className="grid grid-cols-11 gap-2">
              {Array.from({ length: 66 }, (_, i) => (
                <div
                  key={i}
                  onClick={() => toggleDay(goal.id, i)}
                  className={`w-8 h-8 border flex items-center justify-center cursor-pointer rounded ${
                    checkedDays[goal.id]?.[i]
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </main>
  );
}
