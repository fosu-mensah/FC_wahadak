package org.example.demo_login.controller;

import org.example.demo_login.domain.FCOnlineEvent;
import org.example.demo_login.domain.FCWahadakEvent;
import org.example.demo_login.service.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3000", "http://www.fcwahadak.com"})
@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/fconline")
    public Map<String, Object> getFCOnlineEvents(@RequestParam(defaultValue = "1") int page,
                                                 @RequestParam(defaultValue = "10") int pageSize) {
        List<FCOnlineEvent> events = eventService.getFCOnlineEvents(page, pageSize);
        int totalCount = eventService.getTotalFCOnlineEventCount();
        Map<String, Object> response = new HashMap<>();
        response.put("events", events);
        response.put("totalCount", totalCount);
        return response;
    }

    @GetMapping("/fcwahadak")
    public Map<String, Object> getFCWahadakEvents(@RequestParam(defaultValue = "1") int page,
                                                  @RequestParam(defaultValue = "10") int pageSize) {
        List<FCWahadakEvent> events = eventService.getFCWahadakEvents(page, pageSize);
        int totalCount = eventService.getTotalFCWahadakEventCount();
        Map<String, Object> response = new HashMap<>();
        response.put("events", events);
        response.put("totalCount", totalCount);
        return response;
    }

    @GetMapping("/fcwahadak/{eventId}")
    public FCWahadakEvent getFCWahadakEventById(@PathVariable int eventId) {
        return eventService.getFCWahadakEventById(eventId);
    }

    @PostMapping("/fcwahadak")
    public ResponseEntity<?> createFCWahadakEvent(@RequestBody FCWahadakEvent event) {
        try {
            eventService.createFCWahadakEvent(event);
            return ResponseEntity.ok("Event created successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create event");
        }
    }

    @PutMapping("/fcwahadak/{eventId}")
    public void updateFCWahadakEvent(@PathVariable int eventId, @RequestBody FCWahadakEvent event) {
        event.setEvent_id(eventId); // 언더스코어가 포함된 필드 이름에 맞춤
        eventService.updateFCWahadakEvent(event);
    }

    @DeleteMapping("/fcwahadak/{eventId}")
    public void deleteFCWahadakEvent(@PathVariable int eventId) {
        eventService.deleteFCWahadakEvent(eventId);
    }
}
