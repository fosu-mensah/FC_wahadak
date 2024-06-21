import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PostList.css'; // 스타일링을 위한 CSS 파일

const BASE_URL = 'http://localhost:8080/api';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/posts/top-liked`)
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the top liked posts!', error);
            });
    }, []);

    return (
        <div className="post-list">
            <h2 className="fixed-title">인기 게시물</h2>
            <ul className="post-list-content">
                {posts.map(post => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>좋아요: {post.like_count}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostList;
