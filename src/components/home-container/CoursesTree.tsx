'use client'

import React from "react";

const courses = {
  university: "BUET",
  departments: {
    "CSE": ["CSE101", "CSE102", "CSE103", "CSE204", "CSE302"],
    "EEE": ["EEE101", "EEE103", "EEE204"],
    "ME": ["ME101", "ME102", "ME204", "ME302"],
  }
}

const CoursesTree = () => {
  return (
    <div className='invisible lg:visible fixed right-5 xl:right-10 top-30 h-full'>
      <div
        className="flex w-48 xl:w-56 flex-col items-start justify-between px-6 rounded-xl bg-white shadow-sm">
        <h2 className="mx-auto my-5 text-xl font-bold tracking-wide text-gray-500">My Courses</h2>
        <h2 className="text-gray-500 font-bold mb-5">{courses.university}</h2>
        {
          Object.keys(courses.departments).map((department, index) => {
            return (
              <div key={index} className="flex flex-col w-full mb-5">
                <div className="flex flex-row items-center justify-between w-full px-2 py-2 text-sm font-semibold text-gray-500 bg-gray-100 rounded-t-xl">
                  <span>{department}</span>
                  <span className="text-xs font-medium text-gray-400">{courses.departments[department].length}</span>
                </div>
                <div className="flex flex-col w-full">
                  {
                    courses.departments[department].map((course, index) => {
                      return (
                        <div key={index} className="flex flex-row items-center justify-between w-full px-2 py-2 text-sm font-medium text-gray-500 bg-white rounded-b-xl hover:bg-gray-100 mr-10">
                          <span>{course}</span>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default CoursesTree;
