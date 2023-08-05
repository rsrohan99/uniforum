import {Navbar} from "~/components/navbar/Navbar";
import Container from "~/components/Container";

function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="pt-20"></div>
      <Container>
        {children}
      </Container>
    </>
  );
}
export default ProfileLayout;
