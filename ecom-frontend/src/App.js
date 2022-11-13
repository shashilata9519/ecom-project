import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddToCart from "./components/AddToCart";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import PrivateComponent from "./components/PrivateComponent";
import ProductDetail from "./components/ProductDetail";

import Register from "./components/Register";
import SearchProduct from "./components/SearchProduct";
import UserProfile from "./components/UserProfile";
import WishList from "./components/WishList";
import ProtectedRoute from "./Routes/ProtectedRoute";
console.log("Hello world")
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:search" element={<Home />} />

          <Route element={<PrivateComponent />}>
            <Route path="/cart" element={<AddToCart />}>
              <Route path="/cart/:id" element={<AddToCart />} />
            </Route>
          </Route>

          <Route path="/profile" element={ <ProtectedRoute> <UserProfile /></ProtectedRoute> }/>
          <Route path="/wishlist" element={ <ProtectedRoute> <WishList /></ProtectedRoute> }/>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/productdetail/:id" element={<ProductDetail />} />
          
          <Route path="/product" element={<SearchProduct />} />
          <Route path="/product/:keyword" element={<SearchProduct />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
