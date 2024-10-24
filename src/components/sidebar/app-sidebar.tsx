import * as React from "react";
import { ChartNoAxesCombined, House, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

import logoSrc from "@/assets/logo.svg";

import { NavPages } from "@/components/sidebar/nav-pages";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Alexander Mandrov",
    email: "unsleeping@forwrd.ai",
    avatar: "/avatars/shadcn.jpg",
  },

  pages: [
    {
      name: "Welcome",
      url: "/",
      icon: House,
    },
    {
      name: "Users",
      url: "/users",
      icon: Users,
    },
    {
      name: "Statistics",
      url: "/statistics",
      icon: ChartNoAxesCombined,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <NavLink to="/" className="w-fit">
                <div className="flex aspect-square items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  <img src={logoSrc} alt="logo" />
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavPages pages={data.pages} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
