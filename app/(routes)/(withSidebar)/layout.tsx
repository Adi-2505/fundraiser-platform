import React from "react";

import Sidebar from "@/components/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row">
      {/* sidebar for Dashboard */}
      <div className="fixed overflow-hidden z-40 left-0 hidden sm:block mt-11">
        <Sidebar />
      </div>
      <div className="ml-5 sm:ml-72 mt-11 p-8">{children}</div>
    </div>
  );
};

export default layout;
