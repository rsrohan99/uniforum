import MidButtons from "~/components/MidButtons";
import Container from "~/components/Container";
import PostsContainer from "~/components/home-container/PostsContainer";
import FilterBox from "~/components/home-container/FilterBox";
import CoursesTree from "~/components/home-container/CoursesTree";

const Homepage = () => {
  return (
    <>
      <MidButtons/>
      <Container>
        <FilterBox/>
        <PostsContainer/>
        <CoursesTree/>

      </Container>
    </>
  )
};
export default Homepage;
