import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/dashboard/theme-provider"

export const metadata: Metadata = {
  title: "Dashboard Application",
  description: "Created by Muhammad Musabbir",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
