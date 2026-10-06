import "./globals.css";

import {
  CONTENT,
} from "@/constants/content";

export const metadata = {
  title: CONTENT.metadata.title,
  description: CONTENT.metadata.description,
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-950 antialiased">
        {children}
      </body>
    </html>
  );
}