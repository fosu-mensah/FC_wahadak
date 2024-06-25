import React, { Fragment, useEffect, useState } from "react";
import Loader from "./component/common/loader/loader";
import Header from "./component/common/header/header";
import Sidebar from "./component/common/sidebar/sidebar";
import Footer from "./component/common/footer/footer";
import { ToastContainer } from "react-toastify";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ConfigDB from "./data/customizer/config";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { checkAuth, getUserInfo } from "./services/authService";

const App = () => {
    const animation = localStorage.getItem("animation") || ConfigDB.data.router_animation || 'fade';
    const location = useLocation();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const isAuth = checkAuth();
            if (isAuth) {
                try {
                    await getUserInfo();
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Failed to fetch user info', error);
                    setIsAuthenticated(false);
                    // 비로그인 상태로 유지
                }
            } else {
                setIsAuthenticated(false);
                // 비로그인 상태로 유지
            }
            setLoading(false);
        };

        initializeAuth();
    }, [navigate]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    if (loading) {
        return <Loader />;
    }

    return (
        <Fragment>
            <div className="page-wrapper">
                <div className="page-body-wrapper">
                    <Header />
                    <Sidebar />
                    <div className="page-body">
                        <TransitionGroup>
                            <CSSTransition
                                key={location.key}
                                timeout={100}
                                classNames={animation}
                                unmountOnExit
                            >
                                <div>
                                    <Outlet context={{ isAuthenticated }} />
                                </div>
                            </CSSTransition>
                        </TransitionGroup>
                    </div>
                    <Footer />
                </div>
            </div>
            <ToastContainer />
        </Fragment>
    );
};

export default App;
