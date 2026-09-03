"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  MessageSquareQuote,
  Layers,
  LogOut,
  ExternalLink,
  PlusCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      href: "/admin",
      label: "Overview",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: "/admin/requests",
      label: "Customer Inquiries",
      icon: MessageSquareQuote,
    },
    {
      href: "/admin/parts",
      label: "Parts Inventory",
      icon: Package,
    },
    {
      href: "/admin/categories",
      label: "Categories",
      icon: Layers,
    },
  ];

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/az/login");
    router.refresh();
  };

  return (
    <aside className="w-64 bg-[#080a0e] border-r border-white/10 flex flex-col justify-between p-4 h-screen sticky top-0">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="px-3 pt-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-black font-black text-lg">
              K
            </div>
            <div>
              <h2 className="text-sm font-black text-white tracking-tight">
                KOREA<span className="text-amber-400">PARTS</span>
              </h2>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Admin Control Room
              </span>
            </div>
          </div>
        </div>

        {/* Quick Action: New Part */}
        <div className="px-2">
          <Link href="/admin/parts/new">
            <Button
              variant="gold"
              size="sm"
              className="w-full text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Part</span>
            </Button>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1 px-1">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Area */}
      <div className="pt-4 border-t border-white/10 space-y-2 px-1">
        <Link
          href="/az"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </span>
          <span className="text-[10px] text-amber-400 font-mono">Live ↗</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
