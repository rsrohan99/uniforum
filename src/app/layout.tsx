// @TODO CHANGE THE METADATA

import "~/styles/globals.css";

import {Inter} from "next/font/google";
import {createServerActionClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import SupabaseProvider from "~/providers/supabase-provider";
import {Toaster} from "react-hot-toast";
import ProgressBar from "~/components/home-container/ProgressBar";
export const dynamic = 'force-dynamic'


const font = Inter({
  subsets: ['latin'],
  display: "swap"
})

export const metadata = {
  title: "UniForum",
  description: "UniForum",
};

async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerActionClient({ cookies })
  const {data, error} = await supabase.auth.getSession();
  return (
    <>
      <html lang="en">
        <head />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <body className={`${font.className} bg-background`}>
        <SupabaseProvider session={data.session}>
          {/*<ProgressBar/>*/}
          {children}
        </SupabaseProvider>
        <Toaster/>
        </body>
      </html>
    </>
  );
}
export default RootLayout;
