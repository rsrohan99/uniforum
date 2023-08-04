import {Navbar} from "~/components/navbar/Navbar";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar/>
      {children}
    </>
  );
}
export default HomeLayout;
