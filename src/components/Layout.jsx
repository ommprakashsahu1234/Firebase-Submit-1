import React from "react";
import { BrowserRouter, Router, Route, Outlet, Routes } from "react-router-dom";

import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Header from "./Header&Footer/Header";
import Footer from "./Header&Footer/Footer";

function Layout() {
  return (
    <div className="page-container flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 max-w-screen-xxl mx-auto w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}


function Frame() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Frame;