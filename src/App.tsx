import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
  Navigate,
} from "react-router-dom";

//@ts-ignore
import HomePage from "./pages/HomePage/HomePage.tsx";
//@ts-ignore
import Header from "./components/Header/Header.tsx";
//@ts-ignore
import Footer from "./components/Footer/Footer.tsx";
//@ts-ignore
import Detail from "./pages/Detail/Detail.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
//@ts-ignore
import WatchFilm from "./pages/WatchFilm/WatchFilm.tsx";
//@ts-ignore
import ListFilm from "./pages/ListFilm/ListFilm.tsx";
//@ts-ignore
import TrendingList from "./pages/TrendingList/TrendingList.tsx";
import PopularList from "./pages/PopularList/PopularList.tsx";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register.tsx";
import { useEffect, useState } from "react";
import Layout from "./components/Layout/Layout.tsx";
import Admin from "./pages/Admin/Admin.tsx";
import AdminLayout from "./components/Layout/AdminLayout.tsx"
import UserSetting from "./pages/UserSetting/UserSetting.tsx";
import Profile from "./components/Content/Profile/Profile.tsx";
import WishList from "./components/Content/WishList/WishList.tsx";
import "./App.scss";
import History from "./components/Content/History/History.tsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.tsx";
import React from "react";
import ChangePassword from "./components/Content/ChangePassword/ChangePassword.tsx";

function App() {
  const [active, setState] = useState<string>("");
  const auth = localStorage.getItem("userInfo")
  return (
    <div className="App">
      <Router>
        {/* <Header></Header> */}
        < >
          <Routes>
           <Route path="/" element={<Layout><HomePage /></Layout>}></Route>
           <Route path="/user/account" element={<Layout><UserSetting /></Layout>}>
                <Route path="profile/:id" element={<Profile/>}></Route>
                <Route path="wishlist" element={<WishList/>}></Route>
                <Route path="history" element={<History/>}></Route>
                <Route path="changepass/:id" element={<ChangePassword/>}></Route>
           </Route>
            <Route path="/watch" element={<Layout><WatchFilm /></Layout>} />
            <Route path="/watch/:id" element={<Layout><WatchFilm /></Layout>} />
            <Route path="/register" element={<Layout><Register /></Layout>}></Route>
            <Route path="/register/:userName/:email" element={<Layout><Register /></Layout>}></Route>
            <Route path="/listfilm" element={<Layout><ListFilm /></Layout>}></Route>
            <Route path="/detail/:slug" element={<Layout><Detail /></Layout>}></Route>
            <Route path="/trending" element={<Layout><TrendingList /></Layout>}></Route>
            <Route path="/popular" element={<Layout><PopularList /></Layout>}></Route>
            <Route path="/login" element={<Layout><Login /></Layout>}></Route>
            <Route path="/forgotpassword" element={<Layout><ForgotPassword /></Layout>}></Route>
          </Routes>
        </>
      </Router>
    </div>
  );
}

export default App;
