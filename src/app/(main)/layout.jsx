import Navbar from "@/components/Navbar";
import React from "react";

function MainLayout({ children }) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}

export default MainLayout;
