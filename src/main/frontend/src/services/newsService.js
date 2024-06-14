// services/newsService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/news';

export const fetchNewsByCategory = async (category, page = 1, size = 10) => {
    try {
        const response = await axios.get(`${BASE_URL}/${category}`, {
            params: {
                page: page,
                size: size
            }
        });
        return {
            articles: response.data.news,
            totalCount: response.data.totalCount
        };
    } catch (error) {
        console.error('Failed to fetch news:', error);
        return { articles: [], totalCount: 0 };
    }
};


// 뉴스 상세 페이지 함수
export const fetchNewsDetail = async (newsId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${newsId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch news detail:', error);
        return null;
    }
};