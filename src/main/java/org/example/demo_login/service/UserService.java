package org.example.demo_login.service;

import org.example.demo_login.api.UserApiClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserApiClient userApiClient;

    @Autowired
    public UserService(UserApiClient userApiClient) {
        this.userApiClient = userApiClient;
    }

    public String getAccountId(String userId) {
        return userApiClient.getAccountId(userId);
    }

    public String getUserBasicInfo(String accountId) {
        return userApiClient.getUserBasicInfo(accountId);
    }

    public String getUserMaxDivision(String accountId) {
        return userApiClient.getUserMaxDivision(accountId);
    }

    public String getUserMatchRecords(String accountId) {
        return userApiClient.getUserMatchRecords(accountId);
    }

    public String getUserTradeRecords(String accountId) {
        return userApiClient.getUserTradeRecords(accountId);
    }
    public byte[] getPlayerImage(String pid) {
        return userApiClient.getPlayerImage(pid);
    }
}
