import React from "react";
import { Route, Routes } from "react-router-dom";

import AppLayout from "../App";

import Signin from "../auth/signin";
import Error400 from "../pages/errors/error400";
import Error404 from "../pages/errors/error404";
import Error500 from "../pages/errors/error500";
import Maintenance from "../pages/maintenance";
import Login from "../pages/authentication/login";
import Register from "../pages/authentication/register";
import Forgetpwd from "../pages/authentication/forgetpwd";
import Comingsoon from "../pages/comingSoon/comingsoon";
import ComingsoonImg from "../pages/comingSoon/comingsoonImg";

import { routes } from "./layouts-routes";
import LoginSuccess from "../auth/LoginSuccess";

const MainRoutes = () => {
    return (
        <Routes>
            <Route path={`/`} element={<AppLayout />}>
                {routes.map(({ path, Component }, i) => (
                    <Route path={path} element={Component} key={i} />
                ))}
            </Route>
            <Route path={`/signin`} element={<Signin />} />
            <Route path={`/pages/error-400`} element={<Error400 />} />
            <Route path={`/pages/error-404`} element={<Error404 />} />
            <Route path={`/pages/error-500`} element={<Error500 />} />
            <Route path={`/pages/maintenance`} element={<Maintenance />} />
            <Route path={`/pages/login`} element={<Login />} />
            <Route path={`/pages/register`} element={<Register />} />
            <Route path={`/pages/forget-password`} element={<Forgetpwd />} />
            <Route path={`/pages/comingsoon`} element={<Comingsoon />} />
            <Route path={`/pages/comingsoon-bg-image`} element={<ComingsoonImg />} />
            <Route path={`/login/success`} element={<LoginSuccess />} />
        </Routes>
    );
}

export default MainRoutes;
