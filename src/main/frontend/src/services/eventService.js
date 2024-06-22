import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/events';

// FC Online 이벤트를 가져오는 함수
export const fetchFCOnlineEvents = async (page = 1, pageSize = 10) => {
    try {
        const response = await axios.get(`${BASE_URL}/fconline`, {
            params: { page, pageSize }
        });
        console.log('API Response:', response.data); // 응답 데이터 확인을 위한 로그
        return response.data;
    } catch (error) {
        console.error('Failed to fetch FC Online events:', error);
        return { events: [], totalCount: 0 };
    }
};

// FC Wahadak 이벤트를 가져오는 함수
export const fetchFCWahadakEvents = async (page = 1, pageSize = 10) => {
    try {
        const response = await axios.get(`${BASE_URL}/fcwahadak`, {
            params: { page, pageSize }
        });
        console.log('API Response:', response.data); // 응답 데이터 확인을 위한 로그
        return response.data;
    } catch (error) {
        console.error('Failed to fetch FC Wahadak events:', error);
        return { events: [], totalCount: 0 };
    }
};