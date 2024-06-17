import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/members';

// 로그인 함수
export const handleLogin = async (loginData) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, loginData);
        const { nickname, member, token } = response.data;
        localStorage.setItem("token", token);
        return { nickname, member, token };
    } catch (error) {
        console.error("로그인 실패", error);
        throw error;
    }
};

// 로그아웃 함수
export const handleLogout = () => {
    localStorage.removeItem("token");
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

// 사용자 정보 가져오기 함수 추가
export const getUserInfo = async () => {
    const token = localStorage.getItem("token");
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
        return response.data;
    } catch (error) {
        console.error("사용자 정보 가져오기 실패", error);
        throw error;
    }
};