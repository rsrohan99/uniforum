import { create } from 'zustand';

const postTypes: string[] = ["Discussion", "Announcement", "Q&A", "Poll"];

interface CourseFilter {
  courseId: string,
  checked: boolean
}

interface CourseFilterHook {
  coursesFilters: CourseFilter[],
  getLatestCoursesFilters: () => CourseFilter[],
  setCoursesFilters: (coursesFilters: CourseFilter[]) => void,
  toggleCheckCourseFilter: (courseId: string) => void,
}

export const usePostTypeFilters = create((set, getState) => ({
  postTypesFilters: postTypes.map(postType => ({ postType, checked: false })),
  getLatestPostTypeFilters: () => getState().postTypesFilters,
  toggleCheckPostType: (postType: string) => set((state) => ({
    postTypesFilters: state.postTypesFilters.map(filter => {
      if (filter.postType === postType) {
        return { ...filter, checked: !filter.checked };
      }
      return filter;
    })
  })),
}));

export const useCoursesFilters = create<CourseFilterHook>((set, getState) => ({
  coursesFilters: [],
  getLatestCoursesFilters: () => getState().coursesFilters,
  setCoursesFilters: (coursesFilters: CourseFilter[]) => set({coursesFilters}),
  toggleCheckCourseFilter: (courseId: string) => set((state) => ({
    coursesFilters: state.coursesFilters.map(filter => {
      if (filter.courseId === courseId) {
        return { ...filter, checked: !filter.checked };
      }
      return filter;
    })
  })),
}));
