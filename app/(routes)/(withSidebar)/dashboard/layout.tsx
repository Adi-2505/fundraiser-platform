import React from "react";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/supabase-server";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (!session) {
    return redirect("/auth");
  }

  return <>{children}</>;
};

export default DashboardLayout;
