import { AppSideBar, TopBar } from "@/shared/sidebar";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useMatches, Outlet } from "react-router-dom";

import type { RouteHandle } from "@/shared/types/common";

const DashboardLayout = () => {
  const matches = useMatches();
  const navigate = useNavigate();

  // Get the deepest matched route that has a title
  const activeMatch = [...matches].reverse().find((match) => (match.handle as RouteHandle)?.title);

  const pageTitle = (activeMatch?.handle as RouteHandle)?.title ?? "Dashboard";

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col">
      {/* TopBar, full width, always on top */}
      <TopBar />

      {/* Sidebar + content row  */}
      <div className="flex flex-1 overflow-hidden">
        <SidebarProvider>
          <AppSideBar />

          <SidebarInset className="bg-neutral">
            {/* SidebarTrigger here, visually top-left of content */}
            <div className="px-4 py-2">
              <SidebarTrigger className="" />
            </div>

            <main className="flex-1 overflow-y-auto p-6">
              <div className="flex items-center gap-6">
                <Button onClick={handleGoBack} size="icon" variant="outline">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <p className="text-sm font-semibold">{pageTitle}</p>
              </div>
              <Outlet />
            </main>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default DashboardLayout;
