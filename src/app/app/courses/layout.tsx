import React from "react";

function CoursesLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <div className="pt-28"></div>
        <div className='mt-10 w-full bg-white'>
          <div className='mx-auto flex h-full w-10/12 justify-between lg:w-7/12'>
            <div className='mt-[-50px]'>
              
            </div>
          </div>
        </div>
        <div className='mx-auto w-10/12 lg:w-7/12'>
          {children}
        </div>
    </>
  );
}
export default CoursesLayout;
