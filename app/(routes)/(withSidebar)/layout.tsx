"use client";

import React from "react";

import Sidebar from "@/components/Sidebar";

import { cn } from "@/lib/utils";


import { useSidebarStore } from "@/hooks/use-sidebar";

const WithSidebarLayout = ({ children }: { children: React.ReactNode }) => {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const sidebarRef = useRef<HTMLDivElement | null>(null);

  const { open, onOpen } = useSidebarStore();

 

  return (
    <div className="flex flex-row">
      <div
        // ref={sidebarRef}
        className={cn(
          "fixed overflow-hidden z-40 left-0 transition sm:block sm:translate-x-0 mt-11",
          open ? "translate-x-0" : "-translate-x-80"
        )}
      >
        <Sidebar />
      </div>
      <div className="ml-5 sm:ml-72 mt-11 p-8">{children}</div>
    </div>
  );
};

export default WithSidebarLayout;
