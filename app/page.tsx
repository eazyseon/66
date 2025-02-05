import GoalForm from "./component/GoalForm";

export default function Home() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4 text-green-500">
        66일 습관만들기!
      </h1>
      <GoalForm />
    </main>
  );
}
