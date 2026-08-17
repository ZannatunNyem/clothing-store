import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminLoginForm from "@/components/auth/AdminLoginForm";

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role === "ADMIN") {
    redirect("/admin/dashboard");
  }

  return (
    <main className="min-h-screen bg-[var(--color-body)] flex items-center justify-center px-5 py-10">
      <AdminLoginForm />
    </main>
  );
}
