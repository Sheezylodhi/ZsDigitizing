import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex bg-white min-h-screen">

      <AdminSidebar />

      <div className="flex-1 p-10">
        {children}
      </div>

    </div>
  );
}
