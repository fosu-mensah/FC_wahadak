package org.example.demo_login.domain;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FCOnlineEvent {

    private int event_id;
    private String event_title;
    private String event_url;
    private String event_img_url;
    private LocalDateTime event_date_start;
    private LocalDateTime event_date_end;

}
