import type { FC } from "react";
import { Link, useMatch } from "react-router";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import type { Icon as IconType } from "@tabler/icons-react";

interface NavItemProps {
    url: string;
    title: string;
    icon?: IconType;
}

const NavItem: FC<NavItemProps> = ({ title, url, icon: Icon }) => (
  <SidebarMenuItem key={title}>
    <SidebarMenuButton
      isActive={!!useMatch(url)}
      tooltip={title}
      className="cursor-pointer"
    >
      <Link to={url} className="flex items-center [&>svg]:size-4 gap-2">
        {Icon && <Icon />}
        <span>{title}</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
)

export default NavItem;
