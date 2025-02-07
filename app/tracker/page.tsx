"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Tracker() {
  const router = useRouter();

  const [goal, setGoal] = useState("");
  const [checkedDays, setCheckedDays] = useState<boolean[]>(
    Array(66).fill(false)
  );

  useEffect(() => {
    const savedGoal = localStorage.getItem("goals");
    if (!savedGoal) {
      router.push("/");
    } else {
      setGoal(savedGoal);
    }
  }, [router]);

  const canToggleDay = (index: number, checkedDays: boolean[]) => {
    const lastCheckedIndex = checkedDays.lastIndexOf(true);
    return index === lastCheckedIndex + 1;
  };

  const isAlreadyCheckedToday = (): boolean => {
    const today = new Date().toISOString().split("T")[0];
    const lastCheckedDate = localStorage.getItem("lastCheckedDate");
    return today === lastCheckedDate;
  };

  const saveCheckedDays = (checkedDays: boolean[]) => {
    localStorage.setItem("checkedDays", JSON.stringify(checkedDays));
    localStorage.setItem(
      "lastCheckedDate",
      new Date().toISOString().split("T")[0]
    );
  };

  const toggleDay = (index: number) => {
    if (!canToggleDay(index, checkedDays)) return;
    if (isAlreadyCheckedToday()) return;

    const newCheckedDays = [...checkedDays];
    newCheckedDays[index] = !newCheckedDays[index];
    setCheckedDays(newCheckedDays);

    saveCheckedDays(newCheckedDays);
  };

  useEffect(() => {
    const savedCheckedDays = localStorage.getItem("checkedDays");
    if (savedCheckedDays) {
      setCheckedDays(JSON.parse(savedCheckedDays));
    } else {
      setCheckedDays(Array(66).fill(false));
    }
  }, []);

  const checkDaysCount = checkedDays.filter((item) => !!item).length;

  return (
    <main className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-xl font-bold mb-4 text-green-500">목표: {goal}</h1>
      <h2 className="text-sx font-bold mb-4 text-orange-400">
        {checkDaysCount}번 해냄!
      </h2>
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
