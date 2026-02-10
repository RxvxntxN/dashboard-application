"use client";

import { Button } from "@/components/ui/button";
import {
  ChartPie,
  BarChart3,
  TrendingUp,
  Users,
  Settings,
  HelpCircle,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navigationItems = [
  { href: "/", label: "Overview", icon: BarChart3 },
  { href: "/analytics", label: "Analytics", icon: TrendingUp },
  { href: "/users", label: "Users", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
];

const footerItems = [
  { href: "/help", label: "Help & Support", icon: HelpCircle },
];

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

     
      <aside
  className={`fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-border z-40 transform transition-transform duration-800 ease-in-out flex flex-col
  ${isOpen ? "translate-x-0" : "-translate-x-full"}
  lg:relative lg:translate-x-0`}>
        
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary  rounded-lg flex items-center justify-center">
              <ChartPie className="w-5 h-5 text-white dark:text-black" />
            </div>
            <span className="font-bold text-foreground ">Analytics</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

     
        <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2">
          {navigationItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 ${
                    isActive ? "bg-primary text-yellow-300 dark:text-black" : ""
                  }`}
                  onClick={onClose}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border px-3 py-4 space-y-2">
          {footerItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start gap-3"
                  onClick={onClose}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </Button>
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
}
