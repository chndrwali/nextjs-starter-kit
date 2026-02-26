import { NavItem } from "@/types";

/**
 * Navigation configuration with RBAC support
 *
 * This configuration is used for both the sidebar navigation and Cmd+K bar.
 *
 * RBAC Access Control:
 * Each navigation item can have an `access` property that controls visibility
 * based on permissions, plans, features, roles, and organization context.
 *
 * Examples:
 *
 * 1. Require organization:
 *    access: { requireOrg: true }
 *
 * 2. Require specific permission:
 *    access: { requireOrg: true, permission: 'org:teams:manage' }
 *
 * 3. Require specific plan:
 *    access: { plan: 'pro' }
 *
 * 4. Require specific feature:
 *    access: { feature: 'premium_access' }
 *
 * 5. Require specific role:
 *    access: { role: 'admin' }
 *
 * 6. Multiple conditions (all must be true):
 *    access: { requireOrg: true, permission: 'org:teams:manage', plan: 'pro' }
 *
 * Note: The `visible` function is deprecated but still supported for backward compatibility.
 * Use the `access` property for new items.
 */
export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: "dashboard",
    isActive: false,
    shortcut: ["d", "d"],
    items: [],
  },
  {
    title: "Inbox",
    url: "/admin/inbox",
    icon: "mail",
    isActive: false,
    items: [],
  },
  {
    title: "Workspaces",
    url: "#", // Placeholder as there is no direct link for the parent
    icon: "workspace",
    isActive: true,
    items: [
      {
        title: "Portfolio",
        url: "/admin/portfolio",
        icon: "layer",
        shortcut: ["m", "m"],
      },
      {
        title: "Resume",
        url: "/admin/resume",
        icon: "profile",
        shortcut: ["m", "m"],
      },
    ],
  },
  {
    title: "Tracker",
    url: "/admin/tracker",
    icon: "exclusive",
    isActive: false,
    items: [],
    // Require organization to be active
    access: { requireOrg: true },
    // Alternative: require specific permission
    // access: { requireOrg: true, permission: 'org:teams:view' }
  },
];
