import React from "react";

import HomeBanner from "../components/home/home-banner";
import HomeBody from "../components/home/home-body";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Home() {
  const user = useSelector((state) => state.user);
  const isAdmin = user?.role_id === 1 ? true : false;
  return (
    <>
      {isAdmin ? (
        <Navigate to="admin/dashboard" />
      ) : (
        <>
          <HomeBanner />
          <HomeBody />
        </>
      )}
    </>
  );
}
