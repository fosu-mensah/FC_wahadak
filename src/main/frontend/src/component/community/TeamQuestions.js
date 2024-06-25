import React, { Fragment, useEffect, useState } from 'react';
import { fetchPosts } from '../../services/communityService';
import { getUserInfo } from '../../services/authService';
import Breadcrumb from "../common/breadcrumb/breadcrumb";
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button
} from "reactstrap";
import { useNavigate } from 'react-router-dom';

const TeamQuestions = () => {
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true); // 추가
    const navigate = useNavigate();

    useEffect(() => {
        const loadUserInfo = async () => {
            try {
                const userInfo = await getUserInfo();
                setCurrentUser(userInfo);
            } catch (error) {
                console.error("Failed to load user info:", error);
                alert("로그인이 필요합니다.");
                navigate(`${process.env.PUBLIC_URL}/signin`);
            } finally {
                setLoading(false); // 로딩 상태를 false로 설정
            }
        };

        loadUserInfo();
    }, [navigate]);

    useEffect(() => {
        if (currentUser) {
            const loadPosts = async () => {
                const data = await fetchPosts('팀 질문');
                console.log('Loaded posts:', data);
                setPosts(data);
            };

            loadPosts();
        }
    }, [currentUser]);

    const handlePostClick = (post) => {
        navigate(`${process.env.PUBLIC_URL}/community/post/${post.id}`, { state: { category: '팀 질문' } });
    };

    if (loading) {
        return <div>Loading...</div>; // 로딩 중일 때 표시
    }

    if (!currentUser) {
        return null; // currentUser가 없을 때는 아무것도 렌더링하지 않음
    }

    return (
        <Fragment>
            <Breadcrumb parent="Community / TeamQuestions" title="팀 질문" />
            <Container fluid={true}>
                <Row>
                    <Col>
                        <Button
                            color="primary"
                            className="float-end mb-3"
                            onClick={() => navigate(`${process.env.PUBLIC_URL}/community/create-post`, { state: { category: '팀 질문' } })}
                        >
                            게시글 작성
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {posts.map(post => (
                        <Col sm="12" xl="6" key={post.id} onClick={() => handlePostClick(post)}>
                            <Card>
                                <CardHeader className="bg-primary">
                                    <h5>{post.title}</h5>
                                </CardHeader>
                                <CardBody>
                                    <p style={{ whiteSpace: 'pre-wrap', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }} className="mb-0">
                                        {post.content ? post.content.substring(0, 50) : ''}...
                                    </p>
                                </CardBody>
                                <CardFooter className="d-flex justify-content-between align-items-center">
                                    <span>작성자 : {post.memberNickname}</span>
                                    <span>
                                        <span role="img" aria-label="heart">❤️</span> {post.like_count}
                                        <span style={{ marginLeft: '10px' }}>Created at : {new Date(post.created_at).toLocaleString()}</span>
                                    </span>
                                </CardFooter>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Fragment>
    );
};

export default TeamQuestions;