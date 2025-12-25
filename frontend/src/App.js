import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setSocket } from "./redux/socketSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  setOnlineUsers,
  setTypingUser,
  clearTypingUser,
  setAuthUser,
  setLoading,
} from "./redux/userSlice";
import axios from "axios";
import { BASE_URL } from "./index.js";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();


  useEffect(() => {
    const checkAuth = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(`${BASE_URL}/api/v1/user/me`, {
          withCredentials: true,
        });
        dispatch(setAuthUser(res.data));
      } catch (error) {
        dispatch(setAuthUser(null));
      } finally {
        dispatch(setLoading(false));
      }
    };

    checkAuth();
  }, [dispatch]);

  useEffect(() => {
    if (!authUser) return;

    const socket = io(BASE_URL, {
      query: { userId: authUser._id },
    });

    dispatch(setSocket(socket));

    socket.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    socket.on("typing", ({ senderId }) => {
      dispatch(setTypingUser(senderId));
    });

    socket.on("stopTyping", () => {
      dispatch(clearTypingUser());
    });

    return () => socket.disconnect();
  }, [authUser, dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
