import React from 'react';
import NavBar from "@/components/nav/nav-bar";
import AppFooter from "@/components/nav/footer";
import {TooltipProvider} from "@/components/ui/tooltip";

const Layout = (
  { children }: { children: React.ReactNode }
) => {
  return (
    <TooltipProvider>
      <div className="bg-tertiary font-sans min-h-screen flex flex-col">
        {/* Header */}
        <NavBar />

        {children}

        {/* Footer */}
        <AppFooter/>
      </div>
    </TooltipProvider>
  );
};

export default Layout;