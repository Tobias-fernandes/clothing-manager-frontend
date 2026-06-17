import type { ReactNode } from "react";
import { AuthHydration } from "./_components/AuthHydration";
import MobileNavHeader from "./_components/Sidebar/mobileHeader";
import SidebarComponent from "./_components/Sidebar";
import GuardianComponent from "./_components/Guardian";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      <AuthHydration />
      <SidebarComponent />
      <div className="flex flex-1 flex-col overflow-hidden">
        <MobileNavHeader />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <GuardianComponent>{children}</GuardianComponent>
        </main>
      </div>
    </div>
  );
}
