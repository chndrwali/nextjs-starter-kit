"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ThemeModeToggleProps {
  variant?: "public" | "admin";
}

export function ThemeModeToggle({ variant = "admin" }: ThemeModeToggleProps) {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        {variant === "public" ? (
          <Button
            variant="ghost"
            className={cn(
              "group/toggle relative inline-flex items-center justify-center overflow-hidden rounded-md px-4 py-2 text-sm font-bold transition-all duration-300",
              "bg-transparent text-foreground shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:-translate-y-0.5",
              "border border-cyan-500/50 hover:border-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-md",
            )}
          >
            <div className="relative size-4 mr-2">
              <Sun className="absolute inset-0 size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute inset-0 size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </div>
            <span>Theme</span>
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="icon"
            className="group/toggle size-8"
          >
            <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn(
          variant === "public" &&
            "border-cyan-500/20 bg-background/95 backdrop-blur-xl",
        )}
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={cn(
            "cursor-pointer focus:bg-fuchsia-500/10 focus:text-fuchsia-500 dark:focus:text-fuchsia-400",
            theme === "light" &&
              "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-medium",
          )}
        >
          <Sun className="mr-2 size-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={cn(
            "cursor-pointer focus:bg-fuchsia-500/10 focus:text-fuchsia-500 dark:focus:text-fuchsia-400",
            theme === "dark" &&
              "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-medium",
          )}
        >
          <Moon className="mr-2 size-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={cn(
            "cursor-pointer focus:bg-fuchsia-500/10 focus:text-fuchsia-500 dark:focus:text-fuchsia-400",
            theme === "system" &&
              "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-medium",
          )}
        >
          <Monitor className="mr-2 size-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
