import { Navbar } from "~/components/navbar/Navbar";


function CoursesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar/>
      {children}
    </>
  );
}
export default CoursesLayout;
