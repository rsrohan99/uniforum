'use client'

import React, { useEffect, useState } from "react";

import Post from "~/components/posts/Post";
import PostsSkeleton from "~/components/posts/PostsSkeleton";
import { useSession, useSupabase } from "~/providers/supabase-provider";
import { useCoursesFilters, usePostTypeFilters } from "~/hooks/usePostFilters";
import { usePostsHook } from "~/hooks/usePosts";
import {useSearchQueryHook} from "~/hooks/useSearchQuery";
import {useTriggerPostRefresh} from "~/hooks/useTriggerPostRefresh";
import {usePostsLoading} from "~/hooks/usePostsLoading";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import NProgress from "nprogress";
import toast from "react-hot-toast";
import {useBookmarks} from "~/hooks/useBookmarks";
import {usePostSorting} from "~/hooks/usePostSorting";
import {usePostRange} from "~/hooks/usePostRange";
import {useEnrolledCoursesHook} from "~/hooks/useEnrolledCourses";
import {useTreeSelectorHook} from "~/hooks/useTreeSelector";

const PostsContainer = () => {

  const [posts, setPosts] = useState([]);
  const {query, getLatestQuery} = useSearchQueryHook()
  const { getLatestPostIds, post_ids } = usePostsHook()
  const {toggleTriggerPostRefresh, triggerPostRefresh} = useTriggerPostRefresh()
  // const [triggerPostsRefresh, setTriggerPostsRefresh] = useState(false);
  // const [postsLoading, setPostsLoading] = useState(true)
  const {getLatestPostsLoading, setPostsLoading} = usePostsLoading();
  const clientSupabase = useSupabase()
  const { postTypesFilters, getLatestPostTypeFilters } = usePostTypeFilters()
  const { coursesFilters, getLatestCoursesFilters, setCoursesFilters } = useCoursesFilters();
  const session = useSession()
  const pathname = usePathname()
  const {isBookmarks, getLatestBookmarks} = useBookmarks()
  const {sortOrder, getLatestSortOrder} = usePostSorting()
  const {postRange, getLatestRange} = usePostRange()
  const {setEnrolledCourses, getLatestEnrolledCourses} = useEnrolledCoursesHook();
  const {getLatestSelected, selected} = useTreeSelectorHook();

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
    toast.remove('login')
    NProgress.done()
  }, [])

  // useEffect(() => {
  //   return () => {
  //     if (posts.length === 0 && !getLatestQuery()) toggleTriggerPostRefresh();
  //   };
  // }, [query]);
  //
  useEffect(() => {
    return () => {
      const getCoursesFilter = async () => {
        const { data: courses_data } = await clientSupabase
          .from('enrollments')
          .select('course')
          .eq('user_id', session?.user.id)
        if (courses_data && courses_data.length > 0) {
          setEnrolledCourses(courses_data.map(course => (course.course as string)))
          setCoursesFilters(courses_data.filter(course => !course.course.includes('_all_~')).map(course => ({
            courseId: course.course,
            checked: false
          })))
        }
      }
      getCoursesFilter();
    };
  }, [hasMounted]);

  

  useEffect(() => {
    return () => {
      if (pathname !== '/app') return
      const getPosts = async () => {
        setPostsLoading(true)
        if (getLatestBookmarks()) {
          const { data: posts, error: posts_error } = await clientSupabase
            .from('bookmarks')
            .select(`post_id(
              id,
              user: user_id(user_id, username, profile_pic),
              title,
              date_posted,
              subtitle,
              post_type,
              university,
              department,
              course
            )`)
            .eq('user_id', session?.user.id)
            .order('date_bookmarked', { ascending: false })
          if (posts_error) throw posts_error;
          // console.log(posts)
          setPosts(posts.map(value=>value.post_id))
          setPostsLoading(false)
          NProgress.done()
          return
        }
        let queryBuilder = clientSupabase
          .from('posts')
          .select(`
            id,
            user: user_id(user_id, username, profile_pic),
            title,
            date_posted,
            subtitle,
            post_type,
            university,
            department,
            course,
            metadata
          `)
          .in('course', [...getLatestEnrolledCourses(), 'buet_all_~'])

        const filteredPostTypes: string[] = getLatestPostTypeFilters().filter(postTypeFilter => postTypeFilter.checked).map(postTypeFilter => postTypeFilter.postType)
        const filteredCourses: string[] = getLatestCoursesFilters().filter(courseFilter => courseFilter.checked).map(courseFilter => courseFilter.courseId)
        const searchPostIds = getLatestPostIds();


        if (filteredPostTypes.length > 0) queryBuilder = queryBuilder.in('post_type', filteredPostTypes)
        if (filteredCourses.length > 0) queryBuilder = queryBuilder.in('course', filteredCourses)
        if (getLatestSelected()) queryBuilder = queryBuilder.eq('course', getLatestSelected())
        if (getLatestQuery() || searchPostIds.length > 0) queryBuilder = queryBuilder.in('id', searchPostIds)

        if (getLatestSortOrder() === "new") queryBuilder = queryBuilder.order('date_posted', { ascending: false })
        else if (getLatestSortOrder() === "top") queryBuilder = queryBuilder.order('votes_count', { ascending: false })

        const latestRange = getLatestRange()
        if (latestRange === "today") {
          const today = new Date()
          today.setHours(0,0,0,0)
          queryBuilder = queryBuilder.gte('date_posted', today.toISOString())
        }
        else if (latestRange === "this_week") {
          const startOfLastWeek = new Date();
          startOfLastWeek.setDate(startOfLastWeek.getDate() - startOfLastWeek.getDay() - 6);
          startOfLastWeek.setHours(0,0,0,0)
          queryBuilder = queryBuilder.gte('date_posted', startOfLastWeek.toISOString())
        }
        else if (latestRange === "this_month") {
          const startOfLastMonth = new Date();
          startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);
          startOfLastMonth.setDate(1);
          startOfLastMonth.setHours(0,0,0,0)
          queryBuilder = queryBuilder.gte('date_posted', startOfLastMonth.toISOString())
        }
        else if (latestRange === "this_year") {
          const startOfLastYear = new Date();
          startOfLastYear.setFullYear(startOfLastYear.getFullYear() - 1);
          startOfLastYear.setMonth(0);
          startOfLastYear.setDate(1);
          startOfLastYear.setHours(0,0,0,0)
          queryBuilder = queryBuilder.gte('date_posted', startOfLastYear.toISOString())
        }

        const { data: posts, error: posts_error } = await queryBuilder
        if (posts_error) throw posts_error;
        // console.log(posts)
        setPosts(posts)
        setPostsLoading(false)
        NProgress.done()
      }
      getPosts();
    };
  }, [hasMounted, postTypesFilters, coursesFilters, post_ids, triggerPostRefresh, isBookmarks, sortOrder, postRange, selected]);


  return (
    <div
      className="flex w-10/12 flex-col gap-4 rounded-xl lg:w-7/12">
      {getLatestBookmarks() && (
        <div
          className="flex flex-row align-middle justify-center text-muted-foreground text-lg font-semibold tracking-wider"
        >Bookmarks</div>
      )}
      {getLatestPostsLoading() ? (
        <>
          <PostsSkeleton />
          <PostsSkeleton />
          <PostsSkeleton />
        </>
      ) : (
        <>
          {posts.map(post => (
            <Post key={post.id} {...post} />
          ))}
        </>
      )}
      {/*<Post/>*/}
    </div>
  );
}

export default PostsContainer;
