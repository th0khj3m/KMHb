import Header from "../../components/header/header";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/footer";
import "./root.css";

export default function Root() {
  return (
    <div className="body-container">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
