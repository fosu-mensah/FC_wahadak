import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/members';

// 로그인 함수
export const handleLogin = async (loginData) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, loginData);
        const { nickname, member, token } = response.data;
        sessionStorage.setItem("token", token);
        return { nickname, member, token };
    } catch (error) {
        console.error("로그인 실패", error);
        throw error;
    }
};

// 로그아웃 함수
export const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
};

// 회원가입 함수
export const handleSignup = async (signupData) => {
    try {
        const response = await axios.post(`${BASE_URL}/insert`, signupData);
        return response.data;
    } catch (error) {
        console.error("회원가입 실패", error);
        throw error;
    }
};

// 사용자 정보 가져오기 함수
export const getUserInfo = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
        console.error("No token found");
        throw new Error("No token found");
    }

    try {
        const response = await axios.get(`${BASE_URL}/userinfo`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("User info response:", response);
        return response.data;
    } catch (error) {
        console.error("사용자 정보 가져오기 실패", error);
        throw error;
    }
};

// 인증 상태 확인 함수
export const checkAuth = () => {
    const token = sessionStorage.getItem("token");
    return !!token;
};

// 구글 로그인 리디렉션 함수
export const redirectToGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
};