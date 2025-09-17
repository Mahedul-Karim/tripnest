import ProtectedRoute from "@/components/common/ProtectedRoute";
import AdminNav from "@/components/dashboard/admin/AdminNav";
import Header from "@/components/dashboard/common/header/Header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute routeFor={["admin"]}>
      <div className="grid md:grid-cols-[230px_1fr] lg:grid-cols-[270px_1fr] overflow-hidden h-screen">
        <AdminNav className="hidden md:block" />
        <div className="min-w-0 flex flex-col">
          <Header />
          <div className="showScrollbar overflow-y-auto overflow-x-hidden h-[calc(100vh_-_72px)]">
            <div className="l-container py-8 max-w-full">{children}</div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Layout;
