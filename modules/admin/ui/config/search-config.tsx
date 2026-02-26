import {
  LayoutDashboard,
  FolderGit2,
  Cpu,
  Award,
  BriefcaseBusiness,
  GraduationCap,
  Share2,
  FileText,
  FileUser,
  Mail,
} from "lucide-react";

export type SearchItem = {
  title: string;
  url: string;
  group: string;
  icon: React.ComponentType<{ className?: string }>;
  shortcut?: string[];
};

export const searchItems: SearchItem[] = [
  // Pages
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    group: "Pages",
    icon: LayoutDashboard,
    shortcut: ["d", "d"],
  },
  {
    title: "Inbox",
    url: "/admin/inbox",
    group: "Pages",
    icon: Mail,
  },
  {
    title: "Portfolio",
    url: "/admin/portfolio",
    group: "Pages",
    icon: FolderGit2,
    shortcut: ["p", "p"],
  },
  {
    title: "Resume",
    url: "/admin/resume",
    group: "Pages",
    icon: FileUser,
    shortcut: ["r", "r"],
  },
  {
    title: "Tracker",
    url: "/admin/tracker",
    group: "Pages",
    icon: BriefcaseBusiness,
    shortcut: ["t", "t"],
  },

  // Portfolio Tabs
  {
    title: "Projects",
    url: "/admin/portfolio?tab=projects",
    group: "Portfolio",
    icon: FolderGit2,
  },
  {
    title: "Skills",
    url: "/admin/portfolio?tab=skills",
    group: "Portfolio",
    icon: Cpu,
  },
  {
    title: "Certificates",
    url: "/admin/portfolio?tab=certificates",
    group: "Portfolio",
    icon: Award,
  },

  // Resume Tabs
  {
    title: "Work Experience",
    url: "/admin/resume?tab=works",
    group: "Resume",
    icon: BriefcaseBusiness,
  },
  {
    title: "Education",
    url: "/admin/resume?tab=education",
    group: "Resume",
    icon: GraduationCap,
  },
  {
    title: "Social Links",
    url: "/admin/resume?tab=social",
    group: "Resume",
    icon: Share2,
  },

  // Tracker Tabs
  {
    title: "Job Applications",
    url: "/admin/tracker?tab=job",
    group: "Tracker",
    icon: BriefcaseBusiness,
  },
  {
    title: "CVs",
    url: "/admin/tracker?tab=cv",
    group: "Tracker",
    icon: FileText,
  },
];
