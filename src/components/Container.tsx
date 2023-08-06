import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="mt-4 flex h-full w-full flex-row justify-center md:mt-8">
      {children}
    </div>
  );
}

export default Container;
