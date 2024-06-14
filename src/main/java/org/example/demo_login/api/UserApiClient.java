package org.example.demo_login.api;

import org.example.demo_login.config.ApiKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;

@Component
public class UserApiClient {

    private final ApiKey apiKey;
    private final RestTemplate restTemplate;

    @Autowired
    public UserApiClient(ApiKey apiKey, RestTemplate restTemplate) {
        this.apiKey = apiKey;
        this.restTemplate = restTemplate;
    }

    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-nxopen-api-key",apiKey.getKey());
        headers.setContentType(MediaType.APPLICATION_JSON); // 필요시 설정
        return headers;
    }

    public String getAccountId(String userId) {
        String url = "https://open.api.nexon.com/fconline/v1/id?nickname=" + userId;
        HttpEntity<String> entity = new HttpEntity<>(createHeaders());

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response.getBody();
    }

    public String getUserBasicInfo(String accountId) {
        String url = "https://open.api.nexon.com/fconline/v1/user/basic?accountId=" + accountId;
        HttpEntity<String> entity = new HttpEntity<>(createHeaders());

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response.getBody();
    }

    public String getUserMaxDivision(String accountId) {
        String url = "https://open.api.nexon.com/fconline/v1/user/maxdivision?accountId=" + accountId;
        HttpEntity<String> entity = new HttpEntity<>(createHeaders());

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response.getBody();
    }

    public String getUserMatchRecords(String accountId) {
        String url = "https://open.api.nexon.com/fconline/v1/user/match?accountId=" + accountId;
        HttpEntity<String> entity = new HttpEntity<>(createHeaders());

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response.getBody();
    }

    public String getUserTradeRecords(String accountId) {
        String url = "https://open.api.nexon.com/fconline/v1/user/trade?accountId=" + accountId;
        HttpEntity<String> entity = new HttpEntity<>(createHeaders());

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response.getBody();
    }
    //플레이어의 고유 식별자(PID)를 입력받아 해당 플레이어의 이미지 URL을 반환
    public String getPlayerImageUrl(String pid) {
        // 9자리 PID로 이미지 조회 시도
        String url9Digit = "https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p" + pid + ".png";
        HttpHeaders headers = createHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<byte[]> response = restTemplate.exchange(url9Digit, HttpMethod.GET, entity, byte[].class);
            if (response.getStatusCode().is2xxSuccessful()) {
                return url9Digit;
            }
        } catch (HttpClientErrorException e) {
            // 9자리 PID로 실패하면 6자리 PID로 폴백
            String playerId6Digit = pid.substring(pid.length() - 6).replaceFirst("^0+(?!$)", "");
            String url6Digit = "https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/players/p" + playerId6Digit + ".png";
            try {
                ResponseEntity<byte[]> response = restTemplate.exchange(url6Digit, HttpMethod.GET, entity, byte[].class);
                if (response.getStatusCode().is2xxSuccessful()) {
                    return url6Digit;
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return null;
    }
    //이 메소드는 getPlayerImageUrl 메소드를 사용하여 이미지의 URL을 먼저 얻고, 그 URL을 이용하여 실제 이미지 데이터(바이트 배열)를 다운로드
    public byte[] getPlayerImage(String pid) {
        String imageUrl = getPlayerImageUrl(pid);
        if (imageUrl != null) {
            HttpHeaders headers = createHeaders();
            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<byte[]> response = restTemplate.exchange(imageUrl, HttpMethod.GET, entity, byte[].class);
            return response.getBody();
        }

        return null;
    }
}
