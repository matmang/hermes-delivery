import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Order } from "../pages/client/Order";
import { Store } from "../pages/client/Store";
import { Stores } from "../pages/client/Stores";

const clientRoutes = [
  {
    path: "/",
    component: <Stores />,
  },
  {
    path: "/store/:id",
    component: <Store />,
  },
  {
    path: "/order/:id",
    component: <Order />,
  },
];

const commonRoutes = [
  {
    path: "/confirm",
    component: <div />,
  },
];

const ownerRoutes = [
  {
    path: "/",
    component: <div />,
  },
];

export const LoggedInRouter = () => {
  const user = {
    name: "김지우",
    role: "CLIENT",
  };
  return (
    <Router>
      <Routes>
        {user.role === "CLIENT" &&
          clientRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          ))}
        {user.role === "OWNER" &&
          ownerRoutes.map((route) => (
            <Route key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
      </Routes>
    </Router>
  );
};
