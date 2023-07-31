// @TODO CHANGE THE METADATA

import "~/styles/globals.css";

export const metadata = {
  title: "UniForum",
  description: "UniForum",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en">
        <head />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <body className="bg-background font-sans">{children}</body>
      </html>
    </>
  );
}
export default RootLayout;
