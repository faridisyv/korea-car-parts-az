import AdminSidebar from "@/components/admin/Sidebar";
import "@/app/globals.css";

export const metadata = {
  title: "Admin Dashboard | Korea Car Parts AZ",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#06070a] text-white flex">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
