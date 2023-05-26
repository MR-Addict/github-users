import "./globals.css";

import pageSession from "@/lib/auth";
import { PopupContextProvider } from "@/contexts";
import { Footer, Logout, ScrollToTop } from "@/components";

export const metadata = {
  title: "Github Users",
  description: "Github Users",
  icons: { icon: "/favicon.ico" }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await pageSession();

  return (
    <html lang="en">
      <body>
        <PopupContextProvider>
          {children}
          <ScrollToTop />
          {session?.accessToken && <Logout />}
          <Footer />
        </PopupContextProvider>
      </body>
    </html>
  );
}
