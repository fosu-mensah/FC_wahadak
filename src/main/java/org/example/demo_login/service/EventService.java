package org.example.demo_login.service;

import org.example.demo_login.Mapper.FCOnlineEventMapper;
import org.example.demo_login.Mapper.FCWahadakEventMapper;
import org.example.demo_login.domain.FCOnlineEvent;
import org.example.demo_login.domain.FCWahadakEvent;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EventService {

    private final FCOnlineEventMapper fconlineEventMapper;
    private final FCWahadakEventMapper fcwahadakEventMapper;

    public EventService(FCOnlineEventMapper fconlineEventMapper, FCWahadakEventMapper fcwahadakEventMapper) {
        this.fconlineEventMapper = fconlineEventMapper;
        this.fcwahadakEventMapper = fcwahadakEventMapper;
    }

    // FC Online 이벤트 조회 (페이징)
    public List<FCOnlineEvent> getFCOnlineEvents(int page, int pageSize) {
        int offset = (page - 1) * pageSize;
        return fconlineEventMapper.selectFCOnlineEvents(pageSize, offset);
    }

    // FC Online 이벤트 총 수 조회
    public int getTotalFCOnlineEventCount() {
        return fconlineEventMapper.countFCOnlineEvents();
    }

    // FC Wahadak 이벤트 조회 (페이징)
    public List<FCWahadakEvent> getFCWahadakEvents(int page, int pageSize) {
        int offset = (page - 1) * pageSize;
        return fcwahadakEventMapper.selectFCWahadakEvents(pageSize, offset);
    }

    // FC Wahadak 이벤트 총 수 조회
    public int getTotalFCWahadakEventCount() {
        return fcwahadakEventMapper.countFCWahadakEvents();
    }

    // FC wahadak 이벤트 id 별로 가져오기
    public FCWahadakEvent getFCWahadakEventById(int eventId) {
        return fcwahadakEventMapper.getEventById(eventId);
    }

    // FC wahadak 이벤트 생성
    public void createFCWahadakEvent(FCWahadakEvent event) {
        fcwahadakEventMapper.insertEvent(event);
    }

    // FC wahadak 이벤트 업데이트
    public void updateFCWahadakEvent(FCWahadakEvent event) {
        fcwahadakEventMapper.updateEvent(event);
    }

    // FC wahadak 이벤트 삭제
    public void deleteFCWahadakEvent(int eventId) {
        fcwahadakEventMapper.deleteEvent(eventId);
    }
}