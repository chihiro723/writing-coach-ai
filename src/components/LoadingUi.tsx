import React from "react";

const LoadingUi = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        <p className="animate-pulse mt-4 text-lg text-gray-500">{`${message}...`}</p>
      </div>
    </div>
  );
};

export default LoadingUi;
