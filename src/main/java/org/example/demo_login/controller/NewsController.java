package org.example.demo_login.controller;

import org.example.demo_login.domain.News;
import org.example.demo_login.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/news")
public class NewsController {
    private final NewsService newsService;

    @Autowired
    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    // 전체 뉴스
    @GetMapping
    public ResponseEntity<List<News>> getAllNews(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(newsService.getAllNews(page, size));
    }

    // 국내 기사
    @GetMapping("/domestic")
    public ResponseEntity<Map<String, Object>> getDomesticNews(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(newsService.getNewsByCategory(1, page, size));
    }

    // 해외 기사
    @GetMapping("/international")
    public ResponseEntity<Map<String, Object>> getInternationalNews(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(newsService.getNewsByCategory(2, page, size));
    }

    
    // 442 독점 기사
    @GetMapping("/exclusive")
    public ResponseEntity<Map<String, Object>> getExclusiveNews(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(newsService.getNewsByCategory(3, page, size));
    }

    // 뉴스 상세 조회
    @GetMapping("/{newsId}")
    public ResponseEntity<News> getNewsById(@PathVariable int newsId) {
        return ResponseEntity.ok(newsService.getNewsById(newsId));
    }
}