"use client";

import * as React from "react";
import { useEffect, useState } from "react";
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

import { toast } from "sonner";

import NavMain from "./nav-main";
import NavTools from "./nav-tools";
import NavUser from "./nav-user";

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
      title: "Employees",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Liste",
          url: "#",
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
          url: "/dispenser"
        },
        {
          title: "Clients",
          url: "#"
        }
      ]
    },
    {
      title: "Flotte",
      url: "#",
      icon: Car,
      items: [
        {
          title: "Liste",
          url: "#",
        },
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
  const [user, setUser] = useState<{
    name: string;
    avatar: string;
    discordId: string;
  } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`api/user/@me`, {
          credentials: "include"
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        toast.error("Erreur lors de la récuperation utilisateur")
      }
    };

    fetchUser();
  }, []);

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
        {user && <NavUser user={user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
