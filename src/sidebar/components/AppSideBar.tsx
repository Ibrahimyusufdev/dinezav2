// Shadcn ui
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

// header and Navigation component for Main and footer
import Header from "./SideHeader";
import NavMain from "./NavMain";
import NavFooter from "./NavFooter";

export const AppSideBar = () => {
  return (
    <TooltipProvider>
      <Sidebar collapsible="icon" className="mt-14 h-auto overflow-y-auto" variant="floating">
        <SidebarHeader className="md:hidden">
          <Header />
        </SidebarHeader>

        {/* Main navigation items */}
        <ScrollArea className="flex-1 overflow-y-auto">
          <SidebarContent>
            <SidebarMenu>
              <NavMain />
            </SidebarMenu>
          </SidebarContent>
        </ScrollArea>

        {/* Footer navigation items, where user can also signout */}
        <SidebarFooter>
          <NavFooter />
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
};
