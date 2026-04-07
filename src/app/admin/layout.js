import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
        <div className="flex bg-white min-h-screen w-full overflow-x-hidden">


      <AdminSidebar />

       <div className="flex-1 p-4 sm:p-10 w-full">
        {children}
      </div>

    </div>
  );
}
