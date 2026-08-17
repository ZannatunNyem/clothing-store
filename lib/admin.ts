// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// export async function requireAdmin() {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.id) {
//     return null;
//   }

//   if (session.user.role !== "ADMIN") {
//     return null;
//   }

//   return session;
// }
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return session;
}
