import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../store/thunkFunctions";
import { AiOutlineShoppingCart } from "react-icons/ai";

const routes = [
  { to: "/login", name: "login", auth: false },
  { to: "/register", name: "signup", auth: false },
  { to: "/product/upload", name: "upload", auth: true },
  {
    to: "/user/cart",
    name: "cart",
    auth: true,
    icon: <AiOutlineShoppingCart style={{ fontSize: "1.4rem" }} />,
  },

  { to: "", name: "logout", auth: true },
  { to: "/history", name: "history", auth: true },
];

export default function NavItem({ mobile }) {
  const isAuth = useSelector((state) => state.user?.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    //로그아웃이 되기 전에 login으로 가려고 하면 라우팅에 걸려서 로그인 페이지로 못가므로 then 씀
    dispatch(logoutUser()).then(() => {
      navigate("/login");
    });
  };
  return (
    <ul
      className={`text-md justify-center w-full flex gap-4 ${
        mobile && "flex-col bg-gray-500 h-full items-center"
      }`}
    >
      {routes.map(({ to, name, auth, icon }) => {
        if (isAuth !== auth) return null;
        if (name === "logout") {
          return (
            <li
              key={name}
              className="py-2 text-center border-b-4 cursor-pointer"
            >
              <Link onClick={handleLogout}>{name}</Link>
            </li>
          );
        } else if (icon) {
          return (
            <li
              className="relative py-2 text-center border-b-4 cursor-pointer"
              key={name}
            >
              <Link to={to}>
                {icon}
                <span className="absolute top-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -right-3">
                  {1}
                </span>
              </Link>
            </li>
          );
        } else {
          return (
            <li
              key={name}
              className="py-2 text-center border-b-4 cursor-pointer"
            >
              <Link to={to}>{name}</Link>
            </li>
          );
        }
      })}
    </ul>
  );
}
