import Footer from "@/components/common/Footer";
import Header from "@/components/header/Header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header /> {children} <Footer />
    </>
  );
};

export default Layout;
