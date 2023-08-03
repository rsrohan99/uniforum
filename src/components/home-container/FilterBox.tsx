'use client'

import React, {useState} from "react";
import { Checkbox } from "~/components/ui/checkbox"


const FilterBox = () => {
  const postTypes: string[] = ["Discussion", "Announcement", "Q&A", "Poll"];
  const courses: string[] = ["CSE101", "CSE201", "CSE301", "ME101", "ME201"];

  const [postTypeFilters, setPostTypeFilters] = useState(
    postTypes.reduce((acc, type) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      acc[type] = false;
      return acc;
    }, {})
  )

  const [coursesFilters, setCoursesFilters] = useState(
    courses.reduce((acc, type) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      acc[type] = false;
      return acc;
    }, {})
  )

  // console.log(postTypeFilters)

  return (
    <div
      className="flex h-[32rem] w-1/6 flex-col items-start bg-white rounded-xl">
      <h2 className="text-xl tracking-wider font-bold text-gray-600 my-5 mx-auto">Filters</h2>
      <div className='flex flex-col gap-1'>
        <h2 className="text-lg tracking-wide font-bold text-gray-500 my-2 ml-5">Post Type</h2>
        {Object.keys(postTypeFilters).map(postTypeFilter => (
          <div key={postTypeFilter} className="text-muted-foreground pl-10">
            <Checkbox
              // checked={postTypeFilters[postTypeFilter]}
              id={postTypeFilter} />
            <label
              htmlFor={postTypeFilter}
              className="text-sm ml-3 align-middle font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {postTypeFilter}
            </label>
          </div>
        ))}
      </div>
      <div className='flex flex-col gap-1 mt-5'>
        <h2 className="text-lg tracking-wide font-bold text-gray-500 my-2 ml-5">Courses</h2>
        {Object.keys(coursesFilters).map(coursesFilter => (
          <div key={coursesFilter} className="text-muted-foreground pl-10">
            <Checkbox
              // checked={postTypeFilters[postTypeFilter]}
              id={coursesFilter} />
            <label
              htmlFor={coursesFilter}
              className="text-sm ml-3 align-middle font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {coursesFilter}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterBox;
