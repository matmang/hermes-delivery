import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const clientRoutes = [
  {
    path: "/stores",
    component: <div />,
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
            <Route key={route.path} path={route.path}>
              {route.component}
            </Route>
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
