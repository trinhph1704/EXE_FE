import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate từ react-router-dom
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Login/Login';
import ListItemPage from './pages/UserPage/ListItemPage/ListItemPage';
import ItemDetails from './Components/User/ItemDetails/ItemDetails';
import NotFound from './pages/NotFound/NotFound';
import ProfilePage from './pages/UserPage/ProfilePage/ProfilePage';
import CartPage from './pages/UserPage/CartPage/CartPage';
import AdminPage from './pages/AdminPage/AdminPage';
import SucessPage from './pages/SucessPage/SucessPage';

function App() {
  return (
    <>
      <Routes>
        {/* Route mặc định chuyển hướng tới trang Login */}
        <Route path="/" element={<Navigate to="/Login" />} /> {/* Trang mặc định */}

        {/* Trang Login */}
        <Route path="/Login" element={<Login />} />

        {/* Trang Home */}
        <Route path="/Home" element={<HomePage />} />

        {/* Trang danh sách sản phẩm */}
        <Route path="/Product" element={<ListItemPage />} />

        {/* Trang chi tiết sản phẩm */}
        <Route path="/Product/Details/:title" element={<ItemDetails />} />

        {/* Trang NotFound cho mọi route không xác định */}
        <Route path="*" element={<NotFound />} />

        {/* Trang thông tin người dùng */}
        <Route path="/Profile" element={<ProfilePage />} />

        {/* Trang Giỏ Hàng */}
        <Route path="/Cart" element={<CartPage />} />

        {/* Trang Admin */}
        <Route path="/Admin" element={<AdminPage />} />

        {/* Trang checkSucess */}
        <Route path="/checkout-success" element={<SucessPage />} />
      </Routes>
    </>
  );
}

export default App;
