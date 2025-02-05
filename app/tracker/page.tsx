"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Tracker() {
  const [goal, setGoal] = useState("");
  const [checkedDays, setCheckedDays] = useState<boolean[]>(
    Array(66).fill(false)
  );
  const router = useRouter();

  useEffect(() => {
    const savedGoal = localStorage.getItem("goal");
    if (!savedGoal) {
      router.push("/");
    } else {
      setGoal(savedGoal);
    }
  }, [router]);

  const toggleDay = (index: number) => {
    const newCheckedDays = [...checkedDays];
    console.log(newCheckedDays);
    newCheckedDays[index] = !newCheckedDays[index];
    setCheckedDays(newCheckedDays);
    // localStorage.setItem("checkedDays", JSON.stringify(newCheckedDays));
  };

  // useEffect(() => {
  //   const savedCheckedDays = localStorage.getItem("checkedDays");
  //   if (savedCheckedDays) {
  //     setCheckedDays(JSON.parse(savedCheckedDays));
  //   }
  // }, []);

  return (
    <main className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-xl font-bold mb-4 text-green-500">목표: {goal}</h1>
      <div className="grid grid-cols-11 gap-2">
        {checkedDays.map((isChecked, i) => (
          <div
            key={i}
            onClick={() => toggleDay(i)}
            className={`w-8 h-8 border flex items-center justify-center cursor-pointer rounded ${
              isChecked ? "bg-green-500 text-white" : "bg-gray-200"
            }`}>
            {i + 1}
          </div>
        ))}
      </div>
    </main>
  );
}
