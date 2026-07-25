"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Bars } from "react-loader-spinner";

export default function DashboardPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace("/login");
      return;
    }

    const role = session.user.role;

    switch (role) {
      case "Admin":
        router.replace("/dashboard/admin");
        break;

      case "Creator":
        router.replace("/dashboard/creator");
        break;

      default:
        router.replace("/dashboard/users");
        break;
    }
  }, [session, isPending, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#080d1e]">
      <Bars
        height="60"
        width="60"
        color="#8b5cf6"
        ariaLabel="loading"
        visible={true}
      />
    </div>
  );
}