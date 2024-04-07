import React from "react";
import "./home.css";

import Banner from "../../components/banner/banner";
import Body from "../../components/homepage-body/homepage-body";

export default function Home() {
  return (
    <section className="page-content">
      <Banner />
      <Body />
    </section>
  );
}
