"use client";

import ExpressionsList from "@/features/home/ExpressionsList";
import GenerateQuestions from "@/features/home/GenerateQuestions";
import SetQuestion from "@/features/home/SetQuestion";
import Tips from "@/features/home/Tips";

const Home = () => {
  return (
    <>
      <div className="mt-5 space-y-10">
        <SetQuestion />
        <GenerateQuestions />
        <Tips />
        <ExpressionsList />
      </div>
    </>
  );
};

export default Home;
