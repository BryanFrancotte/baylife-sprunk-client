import * as React from "react";
import Image from "next/image";

import {
  Calendar,
  Car,
  CircleQuestionMark,
  Citrus,
  LayoutDashboard,
  Users,
} from "lucide-react";

import { 
  Sidebar,
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarRail 
} from "../ui/sidebar";

import NavMain from "./nav-main";
import NavTools from "./nav-tools";
import NavUser from "./nav-user";
import { useAppSidebar } from "@/hooks/use-app-sidebar";

const navigation = {
  main: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          title: "Distributeurs",
          url: "#"
        },
        {
          title: "Events",
          url: "#"
        }
      ],
    },
    {
      title: "Events",
      url: "#",
      icon: Calendar,
      items: [
        {
          title: "Planning",
          url: "#",
        },
        {
          title: "Réservation",
          url: "#",
        },
      ],
    },
    {
      title: "Distributeurs",
      url: "#",
      icon: Citrus,
      items: [
        {
          title: "Gestion",
          url: "/dispensers"
        },
        {
          title: "Propriétaires",
          url: "/dispensers/owners"
        }
      ]
    },
    {
      title: "Flotte",
      url: "#",
      icon: Car,
      items: [
        {
          title: "Suivi",
          url: "#",
        }
      ],
    }
  ],
  tools: [
    {
      name: "Autres",
      url: "#",
      icon: CircleQuestionMark,
    }
  ],
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {

  const user = useAppSidebar()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="items-center pb-0 pt-4">
        <Image
          src="/logos/Sprunk_Fuel_Logo.png"
          alt="logo-sprunk"
          width={100}
          height={100}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain navItems={navigation.main} />
        <NavTools toolsItems={navigation.tools} />
      </SidebarContent>
      <SidebarFooter>
        {user.user && <NavUser user={user.user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
