import Search from "~/components/navbar/Search"
import Logo from "~/components/navbar/Logo"
import UserMenu from "~/components/navbar/UserMenu";

export function Navbar() {
  return (
    <div
      className="
          fixed
          w-full
          bg-white
          z-10
          shadow-sm
        "
    >
      <div
        className="
          py-4
          border-b-[1px]
          mx-3
          sm:mx-10
        "
      >
          <div
            className="
              flex
              flex-row
              items-center
              justify-between
              gap-3
              md:gap-0
            "
          >
            <Logo/>
            <Search/>
            <UserMenu/>
          </div>
      </div>
    </div>
  )
}