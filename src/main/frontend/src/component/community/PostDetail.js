import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostDetails } from '../../services/communityService';
import Breadcrumb from "../common/breadcrumb/breadcrumb";
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardFooter
} from "reactstrap";

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const loadPostDetails = async () => {
            const data = await getPostDetails(postId);
            setPost(data);
        };

        loadPostDetails();
    }, [postId]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <Fragment>
            <Breadcrumb parent="Community / PostDetail" title="게시물 상세 페이지" />
            <Container fluid={true}>
                <Row className="justify-content-center">
                    <Col sm="12" xl="8">
                        <Card>
                            <CardHeader className="bg-primary">
                                <h5>{post.title}</h5>
                            </CardHeader>
                            <CardBody>
                                {post.image_url && <img src={`/uploads/${post.image_url}`} alt={post.title} style={{ maxWidth: '100%' }} />}
                                <div style={{ whiteSpace: 'pre-wrap', marginTop: '20px' }}>{post.content}</div>
                            </CardBody>
                            <CardFooter className="d-flex justify-content-between align-items-center">
                                <span>작성자: {post.memberNickname}</span>
                                <span>
                                    <span role="img" aria-label="heart">❤️</span> {post.like_count}
                                    <span style={{ marginLeft: '10px' }}>Created at: {new Date(post.created_at).toLocaleString()}</span>
                                </span>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default PostDetail;