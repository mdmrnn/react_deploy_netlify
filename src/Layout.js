import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
export default function Layout({ search, setSearch, width }) {
  return (
    <div className="App">
      <Header title="React JS weblog" width={width} />
      <Nav search={search} setSearch={setSearch} />
      <Outlet />
      <Footer />
    </div>
  );
}
