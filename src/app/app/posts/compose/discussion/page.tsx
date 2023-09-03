'use client'

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "~/components/ui/dropdown-menu";
import {Button} from "~/components/ui/button";
import {ChevronDown} from "lucide-react";
import React, {useEffect, useState} from "react";
import Compose from "~/components/posts/Compose";
import {useEnrolledCoursesHook} from "~/hooks/useEnrolledCourses";
import {useSession, useSupabase} from "~/providers/supabase-provider";
import {transformHierarchy} from "~/utils/getHierarchy";

interface Department {
  dept_id: string,
  courses: string[]
}
interface Hierarchy {
  uni: string,
  departments: Department[]
}

function ComposePage() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, [])

  const {getLatestEnrolledCourses, setEnrolledCourses} = useEnrolledCoursesHook();
  const supabase = useSupabase();
  const session = useSession();

  const [hierarchy, setHierarchy] = useState<Hierarchy>()

  useEffect(() => {
    return () => {
      const getCourses = async () => {
        const {data:enr_data} = await supabase
          .from('enrollments')
          .select('course')
          .eq('user_id', session?.user.id)
        const enrolledCoursesList = enr_data?.map(enr => (enr.course as string)) || []
        setEnrolledCourses(enrolledCoursesList)
        const {data} = await supabase
          .from('courses')
          .select('id, department(id)')
          .in('id', getLatestEnrolledCourses())
        // console.log(data)
        // console.log(transformHierarchy(data))
        setHierarchy(transformHierarchy(data))
      }
      getCourses()
    };
  }, [hasMounted]);


  // const hierarchy: Hierarchy = {
  //   uni: 'BUET',
  //   departments: [
  //     {
  //       dept_id: 'CSE',
  //       courses: ['CSE101', 'CSE201']
  //     }
  //   ]
  // }

  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedUni, setSelectedUni] = useState("BUET")
  const [selectedCourse, setSelectedCourse] = useState<string>("")

  return (
    <>
      <div className="mx-auto w-10/12 items-center justify-between gap-4 pt-20 md:pt-24 lg:w-7/12">
        <div className='mb-5 text-center text-lg font-bold tracking-wide text-gray-500'>Select Scope of the post</div>
        <div className='flex flex-wrap items-center justify-center gap-4 lg:flex-nowrap'>
          <div className="h-8 rounded-xl bg-white px-5 align-middle text-sm font-bold tracking-wide text-gray-500 pt-[6px]">{selectedUni}</div>
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
              {hierarchy?.departments.map(dept_obj => (
                <DropdownMenuItem
                  onClick={() => setSelectedDepartment(dept_obj.dept_id)}
                  key={dept_obj.dept_id}>
                  {dept_obj.dept_id}
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
                {hierarchy?.departments.filter(dept_obj => dept_obj.dept_id === selectedDepartment)[0]?.courses.filter(course => !course.toLowerCase().includes('_all_~')).map(course => (
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
      <Compose post_type={'Discussion'} uni={selectedUni} course={selectedCourse} department={selectedDepartment}/>
    </>
  );
}

export default ComposePage;
