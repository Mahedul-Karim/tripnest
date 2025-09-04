import ProtectedRoute from "@/components/common/ProtectedRoute";
import Header from "@/components/dashboard/common/header/Header";
import VendorNav from "@/components/dashboard/vendor/VendorNav";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute routeFor={["vendor", "admin"]}>
      <div className="grid md:grid-cols-[230px_1fr] lg:grid-cols-[270px_1fr] overflow-clip h-screen">
        <VendorNav className="hidden md:block" />
        <div>
          <Header />
          <div className="showScrollbar overflow-auto h-[calc(100vh_-_72px)]">
            <div className="l-container py-8">{children}</div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Layout;
