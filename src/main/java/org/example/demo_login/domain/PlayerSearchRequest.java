package org.example.demo_login.domain;

import lombok.Data;

@Data
public class PlayerSearchRequest {
    private String pname;
    private String season;
    private String sortOrder;
    private Integer enhancementLevel;
}
