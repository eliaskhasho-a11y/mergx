import "@/styles/globals.css";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export const metadata = { title: "MergX v8.95", description: "AI-driven B2B Admin" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>
        <div className="layout">
          <Sidebar />
          <main className="main">
            <Topbar />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
