import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-[var(--color-body)]">
      <AdminSidebar></AdminSidebar>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
