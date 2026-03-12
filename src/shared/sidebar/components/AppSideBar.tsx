// Shadcn ui
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";

// header and Navigation component for Main and footer
import Header from "./Header";
import NavMain from "./NavMain";
import NavFooter from "./NavFooter";

export const AppSideBar = () => {
  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <Header />
        </SidebarHeader>

        {/* Main navigation items */}
        <SidebarContent>
          <SidebarMenu>
            <NavMain />
          </SidebarMenu>
        </SidebarContent>

        {/* Footer navigation items, where user can also signout */}
        <SidebarFooter>
          <NavFooter />
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

