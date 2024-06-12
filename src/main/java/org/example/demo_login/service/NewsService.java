package org.example.demo_login.service;

import org.example.demo_login.domain.News;
import org.example.demo_login.Mapper.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NewsService {
    private final NewsRepository newsRepository;

    @Autowired
    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    public List<News> getAllNews(int page, int size) {
        int offset = (page - 1) * size;
        return newsRepository.findAll(size, offset);
    }

    public List<News> getDomesticNews(int page, int size) {
        int offset = (page - 1) * size;
        return newsRepository.findDomesticNews(size, offset);
    }

    public List<News> getInternationalNews(int page, int size) {
        int offset = (page - 1) * size;
        return newsRepository.findInternationalNews(size, offset);
    }

    public List<News> getExclusiveNews(int page, int size) {
        int offset = (page - 1) * size;
        return newsRepository.findExclusiveNews(size, offset);
    }

    public Map<String, Object> getNewsByCategory(int categoryId, int page, int size) {
        int offset = (page - 1) * size;
        List<News> news = newsRepository.findNewsByCategory(categoryId, size, offset);
        int totalCount = newsRepository.countNewsByCategory(categoryId);
        Map<String, Object> response = new HashMap<>();
        response.put("news", news);
        response.put("totalCount", totalCount);
        return response;
    }
}