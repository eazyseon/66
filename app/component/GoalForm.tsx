"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GoalForm() {
  const [goal, setGoal] = useState("");
  const router = useRouter();

  const handleSave = () => {
    if (goal.trim() === "") return;
    localStorage.setItem("goal", goal);
    router.push("/tracker");
  };

  return (
    <div>
      <input
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        className="border p-2 w-full text-black"
        placeholder="목표 입력"
      />
      <button
        onClick={handleSave}
        className="mt-2 bg-blue-500 text-white p-2 rounded">
        저장
      </button>
    </div>
  );
}
