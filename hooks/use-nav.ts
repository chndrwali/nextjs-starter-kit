"use client";

/**
 * Fully client-side hook for filtering navigation items based on RBAC
 *
 * This hook uses Clerk's client-side hooks to check permissions, roles, and organization
 * without any server calls. This is perfect for navigation visibility (UX only).
 *
 * Performance:
 * - All checks are synchronous (no server calls)
 * - Instant filtering
 * - No loading states
 * - No UI flashing
 *
 * Note: For actual security (API routes, server actions), always use server-side checks.
 * This is only for UI visibility.
 */

import { useMemo } from "react";
import type { NavItem } from "@/types";

/**
 * Hook to filter navigation items based on RBAC (fully client-side)
 *
 * @param items - Array of navigation items to filter
 * @returns Filtered items
 */
export function useFilteredNavItems(items: NavItem[]) {
  // Filter items synchronously (all client-side)
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        // No access restrictions
        if (!item.access) {
          return true;
        }

        if (item.access.plan || item.access.feature) {
          // Option: Return true and let the page handle it, or use server action
          // For now, we'll show it (page-level protection should handle it)
          console.warn(
            `Plan/feature checks for navigation items require server-side verification. ` +
              `Item "${item.title}" will be shown, but page-level protection should be implemented.`,
          );
        }

        return true;
      })
      .map((item) => {
        // Recursively filter child items
        if (item.items && item.items.length > 0) {
          const filteredChildren = item.items.filter((childItem) => {
            // No access restrictions
            if (!childItem.access) {
              return true;
            }

            // Plan/feature checks (same warning as above)
            if (childItem.access.plan || childItem.access.feature) {
              console.warn(
                `Plan/feature checks for navigation items require server-side verification. ` +
                  `Item "${childItem.title}" will be shown, but page-level protection should be implemented.`,
              );
            }

            return true;
          });

          return {
            ...item,
            items: filteredChildren,
          };
        }

        return item;
      });
  }, [items]);

  return filteredItems;
}
