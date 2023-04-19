import "./globals.css";

import { PopupContextProvider } from "@/contexts";
import { Footer, ScrollToTop } from "@/components";

export const metadata = {
  title: "Github Users",
  description: "Github Users",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <PopupContextProvider>
          {children}
          <ScrollToTop />
          <Footer />
        </PopupContextProvider>
      </body>
    </html>
  );
}
