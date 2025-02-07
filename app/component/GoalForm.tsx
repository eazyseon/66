"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GoalForm() {
  const [goal, setGoal] = useState("");
  const router = useRouter();

  const handleSave = () => {
    if (goal.trim() === "") return;

    // 기존 목표 리스트 가져오기
    const existingGoals = JSON.parse(localStorage.getItem("goals") || "[]");

    // 새로운 목표 추가
    const newGoal = {
      id: Date.now().toString(),
      title: goal,
      checkedDays: Array(66).fill(false),
      createdAt: new Date().toISOString().split("T")[0],
    };

    // 업데이트된 목표 리스트 저장
    const updatedGoals = [...existingGoals, newGoal];
    localStorage.setItem("goals", JSON.stringify(updatedGoals));

    // 입력 필드 초기화 후 트래커 페이지 이동
    setGoal("");
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
