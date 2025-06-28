"use client";

import ExpressionsList from "@/features/home/ExpressionsList";
import GenerateQuestions from "@/features/home/GenerateQuestions";
import SetQuestion from "@/features/home/SetQuestion";
import Tips from "@/features/home/Tips";

const Home = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-16">
        <SetQuestion />
        <GenerateQuestions />
        <Tips />
        <ExpressionsList />
      </div>
    </main>
  );
};

export default Home;
