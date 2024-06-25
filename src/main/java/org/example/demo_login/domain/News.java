package org.example.demo_login.domain;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class News {

    private int news_id;
    private int news_category_id;
    private String news_title;
    private String news_summary;
    private String news_content;
    private String news_thumb_url;
    private String news_url;
    private String media_name;
    private LocalDateTime news_reg_date;
    private LocalDateTime reg_date;
    private String news_img_url;

}
