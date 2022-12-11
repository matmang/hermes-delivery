import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Notfound } from "../pages/404";
import { CreateAccount } from "../pages/auth/create-account";
import { LoginScreen } from "../pages/auth/loginScreen";

export const LoggedOutRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />}></Route>
        <Route path="/create-account" element={<CreateAccount />}></Route>
        <Route element={<Notfound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
