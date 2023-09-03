import { create } from 'zustand';

interface CoursesHook {
  enrolledCourses: string[],
  getLatestEnrolledCourses: () => string[],
  setEnrolledCourses: (courses: string[]) => void,
}


export const useEnrolledCoursesHook = create<CoursesHook>((set, getState) => ({
  enrolledCourses: [],
  getLatestEnrolledCourses: () => getState().enrolledCourses,
  setEnrolledCourses: (courses: string[]) => set({enrolledCourses: courses}),
}));
