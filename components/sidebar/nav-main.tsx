"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import { 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarMenuSub, 
  SidebarMenuSubItem, 
  SidebarMenuSubButton 
} from "../ui/sidebar";

import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "../ui/collapsible";

import Link from "next/link";
import { toast } from "sonner";


const NavMain = ({
  navItems,
}: {
  navItems: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Gestion</SidebarGroupLabel> {/* TODO: make this dynamic */}
      <SidebarMenu>
        {navItems.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link href={subItem.url} onClick={
                          () => {
                            if(subItem.url === "#")
                              toast.warning("🚧 This feature is under construction 🚧")
                          }
                          }>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavMain;
