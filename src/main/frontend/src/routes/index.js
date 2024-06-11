import React from "react";
import { Route, Routes } from "react-router-dom";

import AppLayout from "../App";

import configDB from "../data/customizer/config";

import Signin from "../auth/signin";
import Error400 from "../pages/errors/error400";
import Error404 from "../pages/errors/error404";
import Error500 from "../pages/errors/error500";

import Maintenance from "../pages/maintenance";

import Login from "../pages/authentication/login";
import Register from "../pages/authentication/register";
import Forgetpwd from "../pages/authentication/forgetpwd";

import Comingsoon from "../pages/comingSoon/comingsoon";
import ComingsoonVideo from "../pages/comingSoon/comingsoonVideo";
import ComingsoonImg from "../pages/comingSoon/comingsoonImg";

import { routes } from "./layouts-routes";
// import app from '../data/base';


// 변경 사항
// PrivateRoute 제거 - 기존에 사용자 로그인 상태를 확인하던 PrivateRoute를 제거하고, AppLayout 컴포넌트를 기본 경로(/)의 요소로 설정.
// 모든 라우트를 직접적으로 각 컴포넌트와 연결. 로그인 상태와 무관하게 모든 사용자가 접근할 수 있다.
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
                <Route path={`${process.env.PUBLIC_URL}/pages/comingsoon-bg-video`} element={<ComingsoonVideo />} />
          </Routes>
      );
};

export default MainRoutes;
