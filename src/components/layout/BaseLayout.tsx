import { CircularProgress } from "@mui/material";
import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router";

import Footer from "./Footer";
import Header from "./Header";

const BaseLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.pathname === "/404") {
      document.documentElement.style.backgroundColor = "#F8F6F5";
    } else {
      document.documentElement.style.backgroundColor = "unset";
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="pt-[58px] md:pt-[64px] flex-1">
        <Suspense
          fallback={
            <div className="w-full h-[80vh] flex justify-center items-center">
              <CircularProgress size="32px" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
