// import ClientSidebar from "@/components/client/ClientSidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      {/* <ClientSidebar /> */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
