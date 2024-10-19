import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import ListItemPage from './pages/UserPage/ListItemPage/ListItemPage';
import ItemDetails from './Components/User/ItemDetails/ItemDetails';
import NotFound from './pages/NotFound/NotFound';
import ProfilePage from './pages/UserPage/ProfilePage/ProfilePage';
import CartPage from './pages/UserPage/CartPage/CartPage';


function App() {
  return (
    <>
      <Routes>
        {/* Trang Login sẽ hiển thị khi truy cập root ("/") */}
        <Route path="/Login" element={<Login />} />

        {/* Trang Home sẽ hiển thị khi truy cập "/home" */}
        <Route path="/Home" element={<Home />} />

        {/* Trang danh sách sản phẩm */}
        <Route path="/Product" element={<ListItemPage />} />

        {/* Trang chi tiết sản phẩm */}
        <Route path="/Product/Details/:title" element={<ItemDetails />} />

        {/* Trang NotFound sẽ hiển thị cho mọi route không xác định */}
        <Route path="*" element={<NotFound />} /> {/* Đây là route cho trang NotFound */}

        {/* Trang chỉ thông tin người dùng */}
        <Route path="/Profile" element={<ProfilePage />} />

        {/* Trang chỉ qua trang Thanh Toán và Giỏ Hàng  */}
        <Route path="/Cart" element={<CartPage />} />
        {/* comment */}
      </Routes>
    </>
  );
}

export default App;
