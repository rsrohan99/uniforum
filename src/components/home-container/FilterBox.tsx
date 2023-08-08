'use client'

import React, {useEffect, useState} from "react";
import { Checkbox } from "~/components/ui/checkbox"
import {usePostTypeFilters, useCoursesFilters} from "~/hooks/usePostFilters";


const FilterBox = () => {
  const courses: string[] = ["CSE101", "CSE201", "CSE301", "ME101", "ME201"];

  const {postTypesFilters, toggleCheckPostType} = usePostTypeFilters()
  const {coursesFilters, toggleCheckCourseFilter} = useCoursesFilters();
  // console.log(postTypesFilters)
  // const [postTypeFilters, setPostTypeFilters] = useState(
  //   postTypes.reduce((acc, type) => {
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     acc[type] = false;
  //     return acc;
  //   }, {})
  // )

  // console.log(postTypeFilters)

  return (
    <div className='invisible lg:visible fixed left-5 xl:left-10 top-30'>
      <div
        className="flex w-48 xl:w-56 flex-col items-start rounded-xl bg-white shadow-sm h-[32rem]">
        <h2 className="mx-auto my-5 text-xl font-bold tracking-wider text-gray-500">Filters</h2>
        <div className='flex flex-col gap-1'>
          <h2 className="my-2 ml-5 text-lg font-bold tracking-wide text-gray-500">Post Type</h2>
          {postTypesFilters.map(postTypeFilter => (
            <div key={postTypeFilter.postType} className="pl-10 text-muted-foreground">
              <Checkbox
                onCheckedChange={() => {
                  toggleCheckPostType(postTypeFilter.postType)
                }}
                checked={postTypeFilter.checked}
                id={postTypeFilter.postType} />
              <label
                htmlFor={postTypeFilter.postType}
                className="ml-3 peer-disabled:cursor-not-allowed align-middle text-sm font-medium leading-none peer-disabled:opacity-70"
              >
                {postTypeFilter.postType}
              </label>
            </div>
          ))}
        </div>
        <div className='mt-5 flex flex-col gap-1'>
          <h2 className="my-2 ml-5 text-lg font-bold tracking-wide text-gray-500">Courses</h2>
          {coursesFilters.map(coursesFilter => (
            <div key={coursesFilter.courseId} className="pl-10 text-muted-foreground">
              <Checkbox
                onCheckedChange={() => {
                  toggleCheckCourseFilter(coursesFilter.courseId)
                }}
                checked={coursesFilter.checked}
                id={coursesFilter.courseId} />
              <label
                htmlFor={coursesFilter.courseId}
                className="ml-3 peer-disabled:cursor-not-allowed align-middle text-sm font-medium leading-none peer-disabled:opacity-70"
              >
                {coursesFilter.courseId.toUpperCase()}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterBox;
