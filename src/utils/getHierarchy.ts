export interface ICourse {
  id: string;
  department: {
    id: string;
  };
}

interface DepartmentData {
  dept_id: string;
  courses: string[];
}

interface Result {
  uni: string,
  departments: DepartmentData[];
}

export function transformHierarchy(input: ICourse[]): Result {
  const departmentMap: { [key: string]: string[] } = {};

  // Iterate through the input array and group courses by department
  for (const course of input) {
    const departmentId = course.department.id.toUpperCase();
    if (!departmentMap[departmentId]) {
      departmentMap[departmentId] = [];
    }
    departmentMap[departmentId]?.push(course.id.toUpperCase());
  }

  // Convert the grouped data into the desired format
  const departments: DepartmentData[] = [];
  for (const dept_id in departmentMap) {
    if (departmentMap.hasOwnProperty(dept_id)) {
      departments.push({
        dept_id,
        courses: departmentMap[dept_id] || []
      });
    }
  }

  // Create the final result object
  return {
    uni: "BUET",
    departments
  };
}

// Example usage
// const inputObject: Course[] = [
//   {"id":"cse101","department":{"id":"cse"}},
//   {"id":"cse102","department":{"id":"cse"}},
//   {"id":"cse201","department":{"id":"cse"}},
//   {"id":"eee101","department":{"id":"eee"}},
//   {"id":"eee201","department":{"id":"eee"}}
// ];
//
// const transformedObject = transformObject(inputObject);
// console.log(transformedObject);
