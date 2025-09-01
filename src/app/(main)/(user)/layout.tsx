import ProtectedRoute from "@/components/common/ProtectedRoute";
import Sidebar from "@/components/dashboard/user/Sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute routeFor={["admin", "pending", "vendor", "user"]}>
      <div>
        <div className="py-[70px] bg-navy"></div>
        <div className="relative z-[1]">
          <div className="absolute h-[130px] w-full bg-navy top-0 end-0 start-0 -z-[1]" />
          <section className="grid grid-cols-1 pb-32 xs:pb-40 md:grid-cols-[0.4fr_1fr] gap-4 l-container">
            <Sidebar />
            <div className="px-6 py-4 bg-white rounded-xl border border-solid border-border h-max">
              {children}
            </div>
          </section>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Layout;
