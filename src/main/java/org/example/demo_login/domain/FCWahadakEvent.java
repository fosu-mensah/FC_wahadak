package org.example.demo_login.domain;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FCWahadakEvent {

    private int event_id;
    private int creator_id;
    private String event_title;
    private String event_content;
    private String event_img_url;
    private LocalDateTime event_date_start;
    private LocalDateTime event_date_end;

}