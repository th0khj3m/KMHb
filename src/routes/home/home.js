import Header from "../../components/header/header";
import { Outlet } from "react-router-dom";

export default function Home() {
    return (
       <>
        <Header>
            <main>
                <Outlet/>
            </main>
        </Header>
       </>
    );
};
