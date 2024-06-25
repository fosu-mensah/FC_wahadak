import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleToken = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get("token");
            const email = urlParams.get("email");
            console.log("Token: ", token);
            console.log("Email: ", email);
            if (token && email) {
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("username", email);
                navigate(`${process.env.PUBLIC_URL}`); // 메인 페이지로 리디렉션
            } else {
                console.error("Token or email missing in the URL");
            }
        };

        handleToken();
    }, [navigate]);

    return (
        <div>
            <h2>Login successful! Redirecting...</h2>
        </div>
    );
};

export default LoginSuccess;