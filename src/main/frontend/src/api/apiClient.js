import axios from 'axios';


// 환경 변수에서 api 키를 가져옴
const API_KEY = process.env.API_KEY || 'test_9ed73a9a86ed62049eba42d353f6d0c78ba0fd65b103d6d838874848491bf37063a6b8ae9ec6a633753191e72064fd84';

//axios 인스턴스 생성
const apiClient = axios.create({
    baseURL:'http://localhost:8080', //로컬 백엔드 서버 url로 변경
    headers: {
        'Authorization' : `Bearer ${API_KEY}`,
        'Content-Type' : 'application/json'
    }
});

export default apiClient;