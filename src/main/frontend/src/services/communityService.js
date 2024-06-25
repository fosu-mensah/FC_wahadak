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

// 댓글 관련 API 추가
export const getCommentsByPostId = async (postId, nickname) => {
    try {
        const response = await axios.get(`${BASE_URL}/comments/posts/${postId}`, {
            params: { nickname }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch comments:', error);
        return [];
    }
};

export const addComment = async (comment) => {
    try {
        const response = await axios.post(`${BASE_URL}/comments`, comment);
        return response.data;
    } catch (error) {
        console.error('Failed to add comment:', error);
        throw error;
    }
};

export const isPostLikedByUser = async (postId, nickname) => {
    try {
        const response = await axios.get(`${BASE_URL}/posts/${postId}/liked-by-user`, {
            params: { nickname }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to check if post is liked by user:', error);
        return false;
    }
};

export const likePost = async (postId, nickname) => {
    try {
        const response = await axios.post(`${BASE_URL}/posts/${postId}/like`, null, {
            params: { nickname }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to like post:', error);
        throw error;
    }
};

export const unlikePost = async (postId, nickname) => {
    try {
        const response = await axios.delete(`${BASE_URL}/posts/${postId}/like`, {
            params: { nickname }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to unlike post:', error);
        throw error;
    }
};

export const likeComment = async (commentId, nickname) => {
    try {
        const response = await axios.post(`${BASE_URL}/comments/${commentId}/like`, null, {
            params: { nickname }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to like comment:', error);
        throw error;
    }
};

export const unlikeComment = async (commentId, nickname) => {
    try {
        const response = await axios.delete(`${BASE_URL}/comments/${commentId}/like`, {
            params: { nickname }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to unlike comment:', error);
        throw error;
    }
};

export const editPost = async (postId, formData) => {
    try {
        const response = await axios.put(`${BASE_URL}/posts/${postId}/edit`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to edit post:', error);
        throw error;
    }
};

export const deletePost = async (postId, memberNickname) => {
    try {
        const response = await axios.delete(`${BASE_URL}/posts/${postId}/delete`, {
            params: { memberNickname }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to delete post:', error);
        throw error;
    }
};

export const updateComment = async (commentId, commentData) => {
    try {
        const response = await axios.put(`${BASE_URL}/comments/${commentId}`, commentData);
        return response.data;
    } catch (error) {
        console.error('Failed to update comment:', error);
        throw error;
    }
};

export const deleteComment = async (commentId, memberNickname) => {
    try {
        const response = await axios.delete(`${BASE_URL}/comments/${commentId}`, {
            params: { memberNickname }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to delete comment:', error);
        throw error;
    }
};