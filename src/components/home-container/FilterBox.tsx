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
      className="flex w-1/6 flex-col items-start rounded-xl bg-white shadow-sm h-[32rem]">
      <h2 className="mx-auto my-5 text-xl font-bold tracking-wider text-gray-500">Filters</h2>
      <div className='flex flex-col gap-1'>
        <h2 className="my-2 ml-5 text-lg font-bold tracking-wide text-gray-500">Post Type</h2>
        {Object.keys(postTypeFilters).map(postTypeFilter => (
          <div key={postTypeFilter} className="pl-10 text-muted-foreground">
            <Checkbox
              // checked={postTypeFilters[postTypeFilter]}
              id={postTypeFilter} />
            <label
              htmlFor={postTypeFilter}
              className="ml-3 peer-disabled:cursor-not-allowed align-middle text-sm font-medium leading-none peer-disabled:opacity-70"
            >
              {postTypeFilter}
            </label>
          </div>
        ))}
      </div>
      <div className='mt-5 flex flex-col gap-1'>
        <h2 className="my-2 ml-5 text-lg font-bold tracking-wide text-gray-500">Courses</h2>
        {Object.keys(coursesFilters).map(coursesFilter => (
          <div key={coursesFilter} className="pl-10 text-muted-foreground">
            <Checkbox
              // checked={postTypeFilters[postTypeFilter]}
              id={coursesFilter} />
            <label
              htmlFor={coursesFilter}
              className="ml-3 peer-disabled:cursor-not-allowed align-middle text-sm font-medium leading-none peer-disabled:opacity-70"
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
