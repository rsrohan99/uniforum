import React from "react";
import ProfileBanner from "~/components/profile/profileAvatar";

function ProfileLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <div className="pt-28"></div>
        <div className='mt-10 h-36 w-full bg-white'>
          <div className='flex h-full justify-between mx-auto w-10/12 lg:w-7/12'>
            <div className='mt-[-50px]'>
              <ProfileBanner/>
            </div>
          </div>
        </div>
        <div className='mx-auto w-10/12 lg:w-7/12'>
          {children}
        </div>
    </>
  );
}
export default ProfileLayout;