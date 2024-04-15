import React from "react";

import HomeBanner from "../components/home/home-banner";
import HomeBody from "../components/home/home-body";

export default function Home() {
  return (
    <section className="page-content">
      <HomeBanner />
      <HomeBody />
    </section>
  );
}