package org.example.demo_login.controller;

import org.example.demo_login.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"http://localhost:3000", "http://www.fcwahadak.com"})
@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users/{userId}/account-id")
    public String getAccountId(@PathVariable String userId) {
        return userService.getAccountId(userId);
    }

    @GetMapping("/users/{accountId}/basic-info")
    public String getUserBasicInfo(@PathVariable String accountId) {
        return userService.getUserBasicInfo(accountId);
    }

    @GetMapping("/users/{accountId}/max-division")
    public String getUserMaxDivision(@PathVariable String accountId) {
        return userService.getUserMaxDivision(accountId);
    }

    @GetMapping("/users/{accountId}/matches")
    public String getUserMatchRecords(@PathVariable String accountId) {
        return userService.getUserMatchRecords(accountId);
    }

    @GetMapping("/users/{accountId}/trades")
    public String getUserTradeRecords(@PathVariable String accountId) {
        return userService.getUserTradeRecords(accountId);
    }
    ///players/{spid}/image 엔드포인트를 통해 선수 고유 식별자(spid)로 선수 이미지 액션샷을 조회
    //요청이 들어오면 UserService를 통해 UserApiClient의 메서드를 호출하여 이미지를 반환
    // 선수 이미지 조회 (GET 요청)
    // 선수 이미지 조회 (GET 요청)
    @GetMapping("/players/{pid}/image")
    public ResponseEntity<byte[]> getPlayerImage(@PathVariable String pid) {
        return createImageResponse(userService.getPlayerImage(pid));
    }

    private ResponseEntity<byte[]> createImageResponse(byte[] image) {
        if (image != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_PNG);
            return new ResponseEntity<>(image, headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
