package org.example.demo_login.api;

import org.example.demo_login.config.ApiKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

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
        headers.set("Authorization", "Bearer " + apiKey.getKey());
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

    public byte[] getPlayerImage(String pid) {
        // 9자리 PID로 이미지 조회 시도
        String url9Digit = "https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p" + pid + ".png";
        HttpHeaders headers = createHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<byte[]> response = restTemplate.exchange(url9Digit, HttpMethod.GET, entity, byte[].class);
            if (response.getStatusCode().is2xxSuccessful()) {
                return response.getBody();
            }
        } catch (Exception e) {
            // 9자리 PID로 실패하면 6자리 PID로 폴백
            String playerId6Digit = pid.substring(pid.length() - 6).replaceFirst("^0+(?!$)", "");
            String url6Digit = "https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/players/p" + playerId6Digit + ".png";

            try {
                ResponseEntity<byte[]> response = restTemplate.exchange(url6Digit, HttpMethod.GET, entity, byte[].class);
                if (response.getStatusCode().is2xxSuccessful()) {
                    return response.getBody();
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return null;
    }
}
