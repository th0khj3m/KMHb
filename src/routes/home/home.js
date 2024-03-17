import Header from "../../components/header/header";
import { Outlet } from "react-router-dom";
import Footer from "../footer/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
