
'use client'

import React from "react";
import { FaThumbtack } from "react-icons/fa";

interface Subject {
  name: string;
  code: string;
}

interface Department {
  name: string;
  code: string;
  subjects: Subject[];
}

interface University {
  name: string;
  code: string;
  departments: Department[];
}

const CoursesTree: React.FC = () => {
  // Define the data for buetUniversity here
  const buetUniversity: University = {
    name: "BUET",
    code: "BUET",
    departments: [
      {
        name: "Computer Science and Engineering",
        code: "CSE",
        subjects: [
          { name: "Subject 1", code: "CSE101" },
          { name: "Subject 2", code: "CSE102" },
          // Add more subjects here
        ],
      },
      
      // Add more departments here
    ],
  };

  // Add CSS styles for the list items and curved lines
  const listItemStyle: React.CSSProperties = {
    position: "relative",
    paddingLeft: "20px",
  };

  const subjectContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
  };

  const pinIconStyle: React.CSSProperties = {
    marginLeft: "5px",
  };

  return (
    <div className="flex h-[32rem] w-1/6 flex-row items-start justify-between bg-white rounded-xl">
      <div className="mx-auto">
        <h2 className="text-xl tracking-wide font-bold text-gray-500 my-5">
          {"My Courses"}
        </h2>
        <h2 className="text-xl tracking-wide font-bold text-gray-500 my-5">
          {"Buet"}
        </h2>
        <ul>
          {buetUniversity.departments.map((department, departmentIndex) => (
            <li key={department.code} style={listItemStyle}>
              <span style={subjectContainerStyle}>
                {department.code}
             
              </span>
              <ul>
                {department.subjects.map((subject, subjectIndex) => (
                  <li key={subject.code} style={listItemStyle}>
                    <span style={subjectContainerStyle}>
                      {subject.code}
                      <FaThumbtack style={pinIconStyle} />
                    </span>
                    {subjectIndex < department.subjects.length - 1 && (
                      <div className="curved-line"></div>
                    )}
                  </li>
                ))}
              </ul>
              {departmentIndex < buetUniversity.departments.length - 1 && (
                <div className="curved-line"></div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoursesTree;


