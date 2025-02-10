"use client";
import { useEffect, useState } from "react";

export default function MyPage() {
  const [goals, setGoals] = useState<{ id: string; title: string }[]>([]);
  const [checkedDays, setCheckedDays] = useState<Record<string, boolean[]>>({});
  const [goalInput, setGoalInput] = useState("");

  useEffect(() => {
    const savedGoals = localStorage.getItem("goals");
    const savedCheckedDays = localStorage.getItem("checkedDays");

    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
    if (savedCheckedDays) {
      setCheckedDays(JSON.parse(savedCheckedDays));
    }
  }, []);

  const addGoal = (title: string) => {
    const newGoal = { id: Date.now().toString(), title };
    const updatedGoals = [...goals, newGoal];

    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));

    setCheckedDays((prev) => {
      const newCheckedDays = { ...prev, [newGoal.id]: Array(66).fill(false) };
      localStorage.setItem("checkedDays", JSON.stringify(newCheckedDays));
      return newCheckedDays;
    });
  };

  const removeGoal = (goalId: string) => {
    const updatedGoals = goals.filter((goal) => goal.id !== goalId);
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));

    const updatedCheckedDays = { ...checkedDays };
    delete updatedCheckedDays[goalId];
    setCheckedDays(updatedCheckedDays);
    localStorage.setItem("checkedDays", JSON.stringify(updatedCheckedDays));
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="mb-4">
        <button
          onClick={() => {
            if (goalInput.trim()) {
              addGoal(goalInput.trim());
              setGoalInput("");
            }
          }}
          className="bg-blue-500 text-white p-2 rounded">
          목표 추가
        </button>

        <input
          type="text"
          placeholder="새 목표 입력"
          value={goalInput}
          onChange={(e) => setGoalInput(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <ul className="w-full max-w-md">
        {goals.map((goal) => {
          const isCompleted =
            checkedDays[goal.id]?.filter(Boolean).length === 66;
          return (
            <li
              key={goal.id}
              className="p-4 border rounded mb-2 flex justify-between items-center">
              <span className={"text-black"}>{goal.title}</span>
              {isCompleted && <span className="text-green-500">완료!</span>}
              <button
                onClick={() => removeGoal(goal.id)}
                className="bg-red-500 text-white p-2 rounded text-sm">
                삭제
              </button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
