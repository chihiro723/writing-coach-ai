import React, { useState, useEffect } from "react";

const Scoring = () => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-2 ml-3 text-gray-500 font-semibold">
      採点中{".".repeat(dots)}
    </div>
  );
};

export default Scoring;
