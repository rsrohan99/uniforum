'use client'

import React from "react";

const CoursesTree = () => {
  return (
    <div className='invisible lg:visible fixed right-5 xl:right-10 top-30'>
      <div
        className="flex w-48 xl:w-56 flex-row items-start justify-between rounded-xl bg-white shadow-sm h-[32rem]">
        <h2 className="mx-auto my-5 text-xl font-bold tracking-wide text-gray-500">My Courses</h2>
      </div>
    </div>
  );
}

export default CoursesTree;
