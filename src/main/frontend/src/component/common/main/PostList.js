import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { checkAuth } from '../../../services/authService'; // checkAuth 함수 임포트
import './PostList.css'; // 스타일링을 위한 CSS 파일
import 'font-awesome/css/font-awesome.min.css'; // FontAwesome CSS 임포트

const BASE_URL = 'http://localhost:8080/api';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BASE_URL}/posts/top-liked`)
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the top liked posts!', error);
            });
    }, []);

    const handlePostClick = (postId, category) => {
        if (checkAuth()) {
            navigate(`/FC_wahadak/community/post/${postId}`);
        } else {
            alert("로그인이 필요합니다.");
            navigate('/FC_wahadak/signin');
        }
    };

    return (
        <div className="post-list">
            <div className="fixed-title">🔥HOT🔥 게시물</div>
            <ul className="post-list-content">
                {posts.map(post => (
                    <li key={post.id} onClick={() => handlePostClick(post.id, post.category)} className="post-item">
                        <div className="post-title">
                            <div>{post.title}</div>
                            <p><i className="fa fa-heart"></i> {post.like_count}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostList;
