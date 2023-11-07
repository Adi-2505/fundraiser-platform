'use client'

import React, { useEffect, useRef, useState } from "react";

import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";


const layout = ({ children }: { children: React.ReactNode }) => {


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarRef = useRef<HTMLDivElement | null>(null);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);


  return (
    <div className="flex flex-row">

      <div ref={sidebarRef} className={cn(
        "fixed overflow-hidden z-40 left-0 transition sm:block sm:translate-x-0 mt-11",
        isSidebarOpen ? "translate-x-0" : "-translate-x-56"
      )}>
        <Button className="absolute right-1 top-2 sm:hidden" size={'sm'} onClick={toggleSidebar}>
          {isSidebarOpen ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
        </Button>
        <Sidebar />
      </div>
      <div className="ml-5 sm:ml-72 mt-11 p-8">{children}</div>
    </div>
  );
};

export default layout;
