import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Registration } from "./pages/registration";
import { Login } from "./pages/login";
import { AddShop } from "./pages/addshop";
import { AddProduct } from "./pages/addProduct";
import { ShopDetail } from "./pages/shopDetail";
import { Navbar } from "./components/navbar";
import { Logout } from "./pages/logout";
import { useAuth } from "./store/auth";

const App = () => {
  const isLoggedIn = useAuth();
  return (
    <>
      <BrowserRouter>
         <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addShop" element={<AddShop />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/shopDetail" element={<ShopDetail />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
