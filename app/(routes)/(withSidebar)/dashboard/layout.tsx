import { getSession } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (!session) {
    return redirect("/auth");
  }

  return <>{children}</>;
};

export default DashboardLayout;
