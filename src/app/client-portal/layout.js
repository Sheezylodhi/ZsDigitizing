import ClientSidebar from "@/components/ClientSidebar";

export default function ClientLayout({ children }) {
  return (
    <div className="flex bg-white min-h-screen w-full overflow-x-hidden">
      <ClientSidebar />

      {/* Adjust padding for mobile */}
      <div className="flex-1 p-4 sm:p-10 w-full">
        {children}
      </div>
    </div>
  );
}