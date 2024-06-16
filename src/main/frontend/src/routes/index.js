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

const MainRoutes = () => {
    return (
        <Routes>
            <Route path={`${process.env.PUBLIC_URL}/`} element={<AppLayout />}>
                {routes.map(({ path, Component }, i) => (
                    <Route path={path} element={Component} key={i} />
                ))}
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/login`} element={<Signin />} />
            <Route path={`${process.env.PUBLIC_URL}/pages/error-400`} element={<Error400 />} />
            <Route path={`${process.env.PUBLIC_URL}/pages/error-404`} element={<Error404 />} />
            <Route path={`${process.env.PUBLIC_URL}/pages/error-500`} element={<Error500 />} />
            <Route path={`${process.env.PUBLIC_URL}/pages/maintenance`} element={<Maintenance />} />
            <Route path={`${process.env.PUBLIC_URL}/pages/login`} element={<Login />} />
            <Route path={`${process.env.PUBLIC_URL}/pages/register`} element={<Register />} />
            <Route path={`${process.env.PUBLIC_URL}/pages/forget-password`} element={<Forgetpwd />} />
            <Route path={`${process.env.PUBLIC_URL}/pages/comingsoon`} element={<Comingsoon />} />
            <Route path={`${process.env.PUBLIC_URL}/pages/comingsoon-bg-image`} element={<ComingsoonImg />} />
        </Routes>
    );
}

export default MainRoutes;
