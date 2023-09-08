import jwtDecode from "jwt-decode";
import React from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { loadState } from "./Utils/storage";
import MainLayout from "./layout/MainLayout";
import Guides from "./pages/Guides/Guides";
import ShowGuide from "./pages/Guides/components/ShowGuide";
import Login from "./pages/Login/Login";
import Notification from "./pages/Notification/Notification";
import ProfileMe from "./pages/ProfileMe/ProfileMe";
import User from "./pages/User/User";
import Profile from "./pages/User/components/Profile";
import { jwtToken } from "./store/userDataSlice.js";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = loadState("token");
  const user = token && jwtDecode(token);
  React.useEffect(() => {
    if (!token) return navigate("/login");
    dispatch(jwtToken(user?.user));
  }, [token]);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/profile/me" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/me" element={<ProfileMe />} />
          {user?.user.role === "admin" ? (
            <Route path="/users" element={<User />} />
          ) : null}
          {user?.user.role === "admin" ? (
            <Route path="/users/:id" element={<Profile/>} />
          ) : null}
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/:guide_id" element={<ShowGuide />} />
          <Route path="/notification" element={<Notification />} />
        </Route>
        <Route
          path="*"
          element={
            <>
              <h1>404: Page Not Page</h1>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
