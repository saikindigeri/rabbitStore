import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Hero from "./Hero";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
