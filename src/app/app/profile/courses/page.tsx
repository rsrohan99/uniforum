'use client'

import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import NProgress from "nprogress";
import {useSession, useSupabase} from "~/providers/supabase-provider";
import {Button} from "~/components/ui/button";
import {useEnrolledCoursesHook} from "~/hooks/useEnrolledCourses";

interface IDept {
  id: string,
  name: string,
  courses: {
    id: string,
    name: string,
  }[]
}

const CoursesPage = () => {

  const supabase = useSupabase()
  const session = useSession()

  const [allCourse, setAllCourse] = useState<IDept[]>([])
  // const [enrolledCourses, setEnrolledCourses] = useState<string[]>([])
  const {getLatestEnrolledCourses, setEnrolledCourses} = useEnrolledCoursesHook()

  const [refreshEnrollments, setRefreshEnrollments] = useState(false);

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, [])

  useEffect(() => {
    return () => {
      const getCourses = async () => {
        const {data} = await supabase
          .from('departments')
          .select('id, name, courses(id, name)')
        // console.log(data)
        setAllCourse(data as IDept[])
        const {data:enr_data} = await supabase
          .from('enrollments')
          .select('course')
          .eq('user_id', session?.user.id)
        const enrolledCoursesList = enr_data?.map(enr => (enr.course as string)) || []
        setEnrolledCourses(enrolledCoursesList)
      }
      getCourses()
    };
  }, [hasMounted]);

  useEffect(() => {
    return () => {
      const getUserCourses = async () => {
        const {data:enr_data} = await supabase
          .from('enrollments')
          .select('course')
          .eq('user_id', session?.user.id)
        const enrolledCoursesList = enr_data?.map(enr => (enr.course as string)) || []
        setEnrolledCourses(enrolledCoursesList)
      }
      getUserCourses()
    };
  }, [refreshEnrollments]);


  const enrollCourse = async (id: string) => {
    toast.loading("Updating Communities...", {id:'enrollment', position:"bottom-right"})
    const {error} = await supabase
      .from('enrollments')
      .insert({
        user_id: session?.user.id,
        course: id
      })
    if (error) {
      if (error.message.includes("duplicate key value")) {
        await supabase
          .from('enrollments')
          .delete()
          .eq('user_id', session?.user.id)
          .eq('course', id)
        toast.remove('enrollment')
        toast.success(`Left ${id.replace('_all_~', '').toUpperCase()} Community`, {position: "bottom-right"})
      }
    } else {
      toast.remove('enrollment')
      toast.success(`Joined ${id.replace('_all_~', '').toUpperCase()} Community`, {position: "bottom-right"})
    }
    setRefreshEnrollments(!refreshEnrollments)
  }


  return (
    <div>
      <span className="flex flex-row justify-center my-5 text-2xl tracking-wide font-bold text-muted-foreground">Courses</span>
      {allCourse.filter(dept => !dept.id.includes('_all_~')).map(dept => (
        <div className="mt-10" key={dept.id}>
          <span className="text-lg font-bold tracking-wide text-muted-foreground">{dept.id.toUpperCase()} - {dept.name}</span>
          <span>
            <Button
              onClick={async () => {await enrollCourse(`${dept.id}_all_~`)}}
              className={`rounded-xl text-xs ml-2 px-3 py-1 h-min ${(getLatestEnrolledCourses().includes(`${dept.id}_all_~`))?'text-white bg-accent2': 'text-accent2 bg-white'} font-medium tracking-wide ring-1 ring-accent2 hover:bg-accent2 hover:text-white`}>
              {(getLatestEnrolledCourses().includes(`${dept.id}_all_~`))?'Joined': 'Join'}
            </Button></span>
          <div className=" mt-5 flex flex-row flex-wrap gap-x-20 gap-y-3 justify-between">
            {dept.courses.filter(course => !course.id.includes('_all_~')).map(course => (
              <div key={course.id}>
                {course.id.toUpperCase()} - {course.name}
                <span>
            <Button
              onClick={async () => {await enrollCourse(course.id)}}
              className={ `rounded-xl text-xs ml-2 px-3 py-1 h-min ${(getLatestEnrolledCourses().includes(`${course.id}`))?'text-white bg-accent2': 'text-accent2 bg-white'} font-medium tracking-wide ring-1 ring-accent2 hover:bg-accent2 hover:text-white` }>
              {(getLatestEnrolledCourses().includes(`${course.id}`))?'Joined': 'Join'}
            </Button></span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
};
export default CoursesPage;
