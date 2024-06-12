import axios from 'axios'; // HTTP 요청을 쉽게 할 수 있게 해줌.

const BASE_URL = 'http://localhost:8080/api/news'; // API의 기본 URL을 상수로 정의. 이 URL은 뉴스 데이터를 가져오는 API 엔드포인트의 기본 경로이다.

export const fetchNewsByCategory = async (category, page = 1, size = 10) => { // 뉴스 카테고리에 따라 데이터를 가져오는 비동기 함수 fetchNewsByCategory를 정의.
    try {
        const response = await axios.get(`${BASE_URL}/${category}`, {
            params: {
                page: page,
                size: size
            }
        }); // Axios를 사용하여 GET 요청을 보낸다. URL은 BASE_URL 뒤에 카테고리 이름을 붙인 형태이며, 페이지와 크기 파라미터를 추가한다.
        return {
            articles: response.data.news, // 뉴스 기사 데이터를 articles로 반환
            totalCount: response.data.totalCount // 전체 뉴스 개수를 totalCount로 반환
        };
    } catch (error) {
        console.error('Failed to fetch news:', error); // 요청이 실패하면 에러 메시지를 콘솔에 출력.
        return { articles: [], totalCount: 0 }; // 에러가 발생하면 빈 배열과 0을 반환하여, 호출하는 쪽에서 빈 데이터로 처리할 수 있게 한다.
    }
};