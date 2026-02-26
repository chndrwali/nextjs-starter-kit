"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserAvatarProfile } from "@/components/custom/user-avatar-profile";
import { navItems } from "@/modules/admin/ui/config/nav-config";
import { useFilteredNavItems } from "@/hooks/use-nav";
import { ChevronRight, ChevronsDown, Command, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { Icons } from "@/components/custom/icons";
import { useCurrentUser } from "@/hooks/use-current-user";
import gsap from "gsap";
import { SignoutButton } from "@/modules/admin/ui/components/signout-button";

// ==========================================
// Sidebar Logo Component
// ==========================================
const SidebarLogo = () => {
  const { state } = useSidebar();
  const logoRef = React.useRef<HTMLDivElement>(null);
  const textRef = React.useRef<HTMLDivElement>(null);
  const chevronRef = React.useRef<HTMLDivElement>(null); // Ref for Chevron
  const [isOpen, setIsOpen] = React.useState(false); // State for Dropdown

  React.useEffect(() => {
    if (state === "expanded") {
      const tl = gsap.timeline();
      tl.fromTo(
        logoRef.current,
        { rotation: -45, opacity: 0, scale: 0.5 },
        {
          rotation: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
      ).fromTo(
        textRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
        "-=0.3",
      );
    }
  }, [state]);

  // Animate Chevron Rotation based on dropdown state
  React.useEffect(() => {
    if (chevronRef.current) {
      gsap.to(chevronRef.current, {
        rotation: isOpen ? 180 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isOpen]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div
                ref={logoRef}
                className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
              >
                <Command className="size-4" />
              </div>
              <div
                ref={textRef}
                className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden"
              >
                <span className="truncate font-semibold uppercase tracking-wider">
                  Portfolio
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  Candra Wali
                </span>
              </div>
              <div ref={chevronRef}>
                <ChevronsDown className="ml-auto size-4" />
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <Command className="size-4" />
              </div>
              Portfolio
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default function AppSidebar() {
  const { user } = useCurrentUser();
  const pathname = usePathname();
  const router = useRouter();
  const filteredItems = useFilteredNavItems(navItems);

  // Footer state for user dropdown chevron animation
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const userChevronRef = React.useRef<HTMLDivElement>(null);

  // Ref for sidebar items container to stagger animation
  const itemsContainerRef = React.useRef<HTMLUListElement>(null);

  // Stagger animation for sidebar items on mount
  React.useEffect(() => {
    try {
      if (itemsContainerRef.current) {
        // Select all direct list items or buttons
        // Using a more generic selector or class to find children
        const items = itemsContainerRef.current.children;

        if (items.length > 0) {
          gsap.fromTo(
            items,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.4,
              stagger: 0.1,
              ease: "power2.out",
              clearProps: "all",
            },
          );
        }
      }
    } catch (e) {
      console.error("GSAP animation error:", e);
    }
  }, []);

  // Animate User Dropdown Chevron
  React.useEffect(() => {
    if (userChevronRef.current) {
      gsap.to(userChevronRef.current, {
        rotation: isUserDropdownOpen ? 180 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isUserDropdownOpen]);

  // Sidebar Item Hover Interaction
  const handleMouseEnter = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    gsap.to(e.currentTarget, {
      x: 4,
      scale: 1.02,
      duration: 0.2,
      ease: "power1.out",
    });
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    gsap.to(e.currentTarget, {
      x: 0,
      scale: 1,
      duration: 0.2,
      ease: "power1.out",
    });
  };

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenu ref={itemsContainerRef}>
            {filteredItems.map((item) => {
              const Icon = item.icon ? Icons[item.icon] : Icons.logo;
              return item?.items && item?.items?.length > 0 ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem className="sidebar-item-trigger">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={pathname === item.url}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        {item.icon && <Icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === subItem.url}
                              onMouseEnter={(e) =>
                                gsap.to(e.currentTarget, {
                                  x: 4,
                                  duration: 0.2,
                                })
                              }
                              onMouseLeave={(e) =>
                                gsap.to(e.currentTarget, {
                                  x: 0,
                                  duration: 0.2,
                                })
                              }
                            >
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem
                  key={item.title}
                  className="sidebar-item-trigger"
                >
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link href={item.url}>
                      <Icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu
              open={isUserDropdownOpen}
              onOpenChange={setIsUserDropdownOpen}
            >
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  {user && (
                    <UserAvatarProfile
                      className="h-8 w-8 rounded-lg"
                      showInfo
                      email={user.email}
                      name={user.name}
                      imageUrl={user.image || ""}
                    />
                  )}
                  <div ref={userChevronRef}>
                    <ChevronsDown className="ml-auto size-4" />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="px-1 py-1.5">
                    {user && (
                      <UserAvatarProfile
                        className="h-8 w-8 rounded-lg"
                        showInfo
                        email={user.email}
                        name={user.name}
                        imageUrl={user.image || ""}
                      />
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => router.push("/admin/profile")}
                  >
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <SignoutButton />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
