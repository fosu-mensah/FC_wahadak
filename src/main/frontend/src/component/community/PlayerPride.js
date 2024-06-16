import React, { Fragment, useEffect, useState } from 'react';
import { fetchPosts } from '../../services/communityService';
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

const PlayerPride = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadPosts = async () => {
            const data = await fetchPosts('선수 자랑');
            console.log('Loaded posts:', data);
            setPosts(data);
        };

        loadPosts();
    }, []);

    const handlePostClick = (post) => {
        navigate(`${process.env.PUBLIC_URL}/community/post/${post.id}`, { state: { category: '선수 자랑' } });
    };

    return (
        <Fragment>
            <Breadcrumb parent="Community / PlayerPride" title="선수 자랑" />
            <Container fluid={true}>
                <Row>
                    <Col>
                        <Button
                            color="primary"
                            className="float-end mb-3"
                            onClick={() => navigate(`${process.env.PUBLIC_URL}/community/create-post`, { state: { category: '선수 자랑' } })}
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

export default PlayerPride;