import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const fetchPosts = async (category) => {
    try {
        const response = await axios.get(`${BASE_URL}/posts`, {
            params: { category }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        return [];
    }
};

export const createPost = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/posts/write`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to create post:', error);
        throw error;
    }
};

export const getPostDetails = async (postId) => {
    try {
        const response = await axios.get(`${BASE_URL}/posts/${postId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch post details:', error);
        return null;
    }
};