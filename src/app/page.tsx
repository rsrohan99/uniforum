import "./ani_blob.css"
import Logo from "~/components/navbar/Logo";
import TypewriterEffect from "~/components/landing/TypewriterEffect";
import LoginButton from "~/components/landing/loginButton";

const LandingPage = () => {
  const tagLines = [
    "Centralized Discussion",
    "Everything related to Courses, Department and University in one place",
    "Student Friendly",
    "No Distractions",
    "LaTeX support",
    "Share Code Snippets Effortlessly",
    "Latest Announcements",
    "Get Answers to Recurring Questions",
    "Academic Resource Sharing",
  ]
  return (
    <div className="fixed h-screen w-screen ani-blob">
      <div className='text-center'>
        <Logo className="mt-10 mb-8 text-3xl text-gray-600" />
        <div className="text-5xl font-bold tracking-tight text-gray-600 mt-[70px]">An All-in-one Platform</div>
        <div className="mt-6 mb-16 text-3xl font-bold tracking-wide text-gray-600">For University Students</div>
        <TypewriterEffect lines={tagLines}/>
        <LoginButton/>
      </div>

    </div>
  )
};
export default LandingPage;
