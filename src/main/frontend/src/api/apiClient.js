import axios from 'axios';

// 환경 변수에서 API 키를 가져옴
const API_KEY = process.env.REACT_APP_API_KEY || 'test_9ed73a9a86ed62049eba42d353f6d0c78ba0fd65b103d6d838874848491bf37063a6b8ae9ec6a633753191e72064fd84';
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://www.fcwahadak.com/api';

// axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: BASE_URL, // 로컬 백엔드 서버 URL로 변경
    headers: {
        'x-nxopen-api-key': `${API_KEY}`,
        'Content-Type': 'application/json'
    }
});

export default apiClient;
