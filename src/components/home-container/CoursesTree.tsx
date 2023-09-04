'use client'

import React, {useEffect, useState} from "react";
import {useEnrolledCoursesHook} from "~/hooks/useEnrolledCourses";
import {useSession, useSupabase} from "~/providers/supabase-provider";
import {FileSymlink, FolderSymlink, GraduationCap, MapPin} from "lucide-react";
import {useTreeSelectorHook} from "~/hooks/useTreeSelector";

interface IHierarchy {
  id: string,
  courses: {
    id: string,
  }[]
}

const CoursesTree = () => {
  const supabase = useSupabase()
  const session = useSession()

  const [hierarchy, setHierarchy] = useState<IHierarchy[]>([])

  const {getLatestSelected, setSelected} = useTreeSelectorHook()

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, [])

  useEffect(() => {
    return () => {
      const getCourses = async () => {
        const {data} = await supabase
          .from('departments')
          .select('id, courses(id)')
        const {data:enr_data} = await supabase
          .from('enrollments')
          .select('course')
          .eq('user_id', session?.user.id)
        const enrolledCoursesList = enr_data?.map(enr => (enr.course as string)) || []
        // console.log(enrolledCoursesList)
        // const onlyEnrolled = data?.filter(dt=>enrolledCoursesList.includes(dt.id as string))
        const onlyEnrolled = data
          ?.filter((item) =>
            item.courses.some((course) => enrolledCoursesList.includes(course.id as string))
          )
          .map((item) => ({
            id: item.id as string,
            courses: item.courses.filter((course) =>
              enrolledCoursesList.includes(course.id as string)
            ),
          }));

        console.log(onlyEnrolled)

        setHierarchy(onlyEnrolled as IHierarchy[])
        // console.log(data)
      }
      getCourses()
    };
  }, [hasMounted]);

  const setTreeSelected = (selectedFromTree: string) => {
    if (getLatestSelected() === selectedFromTree) setSelected("")
    else setSelected(selectedFromTree)
  }

  return (
    <div className='invisible lg:visible fixed right-5 xl:right-10 top-30'>
      <div
        className="flex w-48 xl:w-56 flex-col items-start rounded-xl bg-white shadow-sm h-[32rem]">
        <h2 className="mx-auto my-5 text-xl font-bold tracking-wide text-gray-500">My Courses</h2>
        <span
          onClick={() => setTreeSelected('buet_all_~')}
          className={`flex flex-row gap-[5px] hover:text-accent2 cursor-pointer items-center ml-6 mt-3 text-xl font-extrabold tracking-wide ${(getLatestSelected()==='buet_all_~')? "text-accent2": "text-muted-foreground"}`}
        ><GraduationCap size={22}/> BUET</span>
        <ul className="mt-4">
          {hierarchy.map(h=>(
            <li
              className="ml-11 cursor-pointer text-lg font-bold mb-3"
              key={h.id}>
              <span
                onClick={() => setTreeSelected(`${h.id}_all_~`)}
                className={`flex flex-row gap-[5px] items-center hover:text-accent2 ${(getLatestSelected()===`${h.id}_all_~`)? "text-accent2": "text-muted-foreground"}`}>
                <FolderSymlink size={16}/>{h.id.replace('_all_~', '').toUpperCase()}
              </span>
              <ul>
              {h.courses.filter(c=>!c.id.includes('_all_~')).map(c=>(
                  <li
                    className="ml-6 cursor-pointer font-medium text-[15px]"
                    key={c.id}>
                    <span
                      onClick={() => {setTreeSelected(c.id)}}
                      className={`flex hover:text-accent2 flex-row gap-[5px] items-center ${getLatestSelected()===c.id? "text-accent2": "text-muted-foreground"}`}>
                      <FileSymlink size={15}/>{c.id.toUpperCase()}
                    </span>
                  </li>
              ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CoursesTree;
