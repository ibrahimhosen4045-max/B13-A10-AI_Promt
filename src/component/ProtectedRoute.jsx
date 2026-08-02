"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({
  children,
  allowedRoles = [],
}) {
  const { data: session, isPending } = authClient.useSession();

  const router = useRouter();

  useEffect(() => {
    if (isPending) return;

    // Login না থাকলে
    if (!session) {
      router.replace("/login");
      return;
    }

    // Role match না করলে
    if (
      allowedRoles.length > 0 &&
      !allowedRoles.includes(session.user.role)
    ) {
      router.replace("/unauthorized");
    }
  }, [session, isPending, allowedRoles, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!session) return null;

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(session.user.role)
  ) {
    return null;
  }

  return children;
}