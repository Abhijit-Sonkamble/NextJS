import { ToastContainer } from "react-toastify";
import NavBar from "./components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-zinc-950 text-amber-50">
      <body className="min-h-screen flex flex-col selection:bg-amber-500/30">
        <NavBar />
        <main className="flex-grow">{children}</main>
        <ToastContainer theme="dark" />
      </body>
    </html>
  );
}