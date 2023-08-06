'use client'

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "~/components/ui/dropdown-menu";
import {Button} from "~/components/ui/button";
import {ChevronDown} from "lucide-react";
import React, {useEffect, useState} from "react";
import Compose from "~/components/posts/Compose";

interface Department {
  dept_name: string,
  courses: string[]
}
interface Hierarchy {
  uni: string,
  departments: Department[]
}

function ComposePage(props) {
  const hierarchy_object: Hierarchy = {
    uni: 'BUET',
    departments: [
      {
        dept_name: 'CSE',
        courses: ['CSE101', 'CSE201']
      }
    ]
  }

  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedUni, setSelectedUni] = useState("BUET")
  const [selectedCourse, setSelectedCourse] = useState<string>("")

  return (
    <>
      <div className="mx-auto w-10/12 items-center justify-between gap-4 pt-20 md:pt-24 lg:w-7/12">
        <div className='text-center mb-5 text-gray-500 font-bold tracking-wide text-lg'>Select Scope of the post</div>
        <div className='flex flex-wrap items-center justify-center gap-4 lg:flex-nowrap'>
          <div className="px-5 pt-[6px] h-8 rounded-xl bg-white text-gray-500 align-middle font-bold tracking-wide text-sm">{selectedUni}</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="
                  px-7
                  h-8
                  rounded-xl
                  bg-white
                  hover:bg-accent2
                  hover:text-white
                  tracking-wider
                  font-bold
                  focus-visible:ring-0 focus-visible:ring-offset-0
                  text-gray-500"
              >{selectedDepartment || 'Select Department'} <span
                className="
                  ml-2 mt-1
              "><ChevronDown size={18}/></span></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-20 rounded-xl font-medium text-muted-foreground" align="center" forceMount>
              {selectedDepartment && (
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedDepartment("")
                    setSelectedCourse("")
                  }}
                  key={'empty'}>
                  {'---'}
                </DropdownMenuItem>
              )}
              {hierarchy_object.departments.map(dept_obj => (
                <DropdownMenuItem
                  onClick={() => setSelectedDepartment(dept_obj.dept_name)}
                  key={dept_obj.dept_name}>
                  {dept_obj.dept_name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {selectedDepartment && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="
                  px-7
                  h-8
                  rounded-xl
                  bg-white
                  hover:bg-accent2
                  hover:text-white
                  tracking-wider
                  font-bold
                  focus-visible:ring-0 focus-visible:ring-offset-0
                  text-gray-500"
                >{selectedCourse || 'Select Course'} <span
                  className="
                  ml-2 mt-1
              "><ChevronDown size={18}/></span></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-20 rounded-xl font-medium text-muted-foreground" align="center" forceMount>
                {hierarchy_object.departments.filter(dept_obj => dept_obj.dept_name === selectedDepartment)[0]?.courses.map(course => (
                  <DropdownMenuItem
                    onClick={() => setSelectedCourse(course)}
                    key={course}>
                    {course}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <Compose type={'Discussion'} uni={selectedUni} course={selectedCourse} department={selectedDepartment}/>
    </>
  );
}

export default ComposePage;
