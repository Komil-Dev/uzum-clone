import { Route, Routes } from "react-router-dom";
import Home from "../App";
import BagPage from "../pages/Bag.Page/Bag.Page";
import Favorites from "../pages/Favorites.Page/Favorites";
import Media from "../pages/Media";
import ProductPage from "../pages/Product.Page/ProductPage";

function RoutesPage() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/bag" element={<BagPage />} />
      <Route path="/media" element={<Media />} />
    </Routes>
  );
}

export default RoutesPage;
