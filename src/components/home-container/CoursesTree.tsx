'use client'

// import React from "react";



// const CoursesTree = () => {
//   return (
//     <div className='invisible lg:visible fixed right-5 xl:right-10 top-30'>
//       <div
//         className="flex w-48 xl:w-56 flex-row items-start justify-between rounded-xl bg-white shadow-sm h-[32rem]">
//         <h2 className="mx-auto my-5 text-xl font-bold tracking-wide text-gray-500">My Courses</h2>
//       </div>
//     </div>
//   );
// }


// export default CoursesTree;

import React from "react";

interface Course {
  name: string;
  courses: string[];
}

interface Department {
  name: string;
  courses: Course[];
}

interface University {
  name: string;
  departments: Department[];
}

const sampleData: University[] = [
  {
    name: "BUET",
    departments: [
      {
        name: "CSE",
        courses: [
          {
            name: "CSE101",
            courses: ["CSE101", "CSE102"],
          },
        ],
      },
      
    ],
  },
  // Add more universities and departments here
];

const CoursesTree = () => {
  return (
    <div className='invisible lg:visible fixed right-5 xl:right-10 top-30 h-screen'>
      <div className="flex w-48 xl:w-56 flex-col items-start justify-between rounded-xl bg-white shadow-sm">
        <h2 className="mx-auto my-5 text-xl font-bold tracking-wide text-gray-500">My Courses</h2>
        <div className="flex-grow h-screen mx-auto"> {/* Use flex-grow to fill remaining height */}
          {sampleData.map((university) => (
            <div key={university.name}>
              <h3 className="font-semibold text-lg">{university.name}</h3>
              {university.departments.map((department) => (
                <div key={department.name}>
                  <h4 className="font-semibold text-md mx-auto">{department.name}</h4>
                  {department.courses.map((course) => (
                    <div key={course.name}>
                      <h5 className="font-semibold text-sm">{course.name}</h5>
                      <ul>
                        {course.courses.map((courseName) => (
                          <li key={courseName} className="text-xs text-gray-500">
                            {courseName}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesTree;
