import Header from "../../components/header/header";
import { Outlet } from "react-router-dom";
import Footer from "../footer/footer";
import "./home.css"

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <Outlet/>
      </main>
      <Footer />
    </div>
  );
}
