import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createPost, getPostDetails, editPost } from '../../services/communityService';
import { getUserInfo } from '../../services/authService';
import Breadcrumb from "../common/breadcrumb/breadcrumb";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Card, CardBody, CardHeader } from 'reactstrap';

const PostForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isEdit = location.state && location.state.postId;
    const category = location.state?.category || 'default category';
    const [postId, setPostId] = useState(location.state?.postId || null);
    const [memberNickname, setMemberNickname] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        const loadUserInfo = async () => {
            try {
                const userInfo = await getUserInfo();
                if (userInfo && userInfo.nickname) {
                    setMemberNickname(userInfo.nickname);
                } else {
                    console.error("Failed to load user nickname");
                }
            } catch (error) {
                console.error("Failed to load user info:", error);
            }
        };

        loadUserInfo();

        if (isEdit) {
            const loadPostDetails = async () => {
                try {
                    const postDetails = await getPostDetails(postId);
                    setTitle(postDetails.title);
                    setContent(postDetails.content);
                    // category는 수정하지 않으므로 설정하지 않음
                } catch (error) {
                    console.error("Failed to load post details:", error);
                }
            };

            loadPostDetails();
        }
    }, [isEdit, postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('memberNickname', memberNickname);
        formData.append('category', category);
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        try {
            if (isEdit) {
                await editPost(postId, formData);
                alert('Post updated successfully');
            } else {
                await createPost(formData);
                alert('Post created successfully');
            }
            navigate(-1);  // Navigate back to the previous page
        } catch (error) {
            alert('Failed to save post');
        }
    };

    return (
        <Fragment>
            <Breadcrumb parent={`Community / ${isEdit ? 'Edit Post' : 'Create Post'}`} title={isEdit ? '게시글 수정' : '게시글 작성'} />
            <Container fluid={true}>
                <Row className="justify-content-center">
                    <Col sm="12" md="8" lg="6">
                        <Card>
                            <CardHeader className="bg-primary text-white">
                                <h5>{isEdit ? '게시글 수정' : '게시글 작성'}</h5>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Label for="memberNickname">Member Nickname</Label>
                                        <Input
                                            type="text"
                                            name="memberNickname"
                                            id="memberNickname"
                                            value={memberNickname}
                                            readOnly
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="title">Title</Label>
                                        <Input
                                            type="text"
                                            name="title"
                                            id="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="content">Content</Label>
                                        <Input
                                            type="textarea"
                                            name="content"
                                            id="content"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            rows="5"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="image">Image</Label>
                                        <Input
                                            type="file"
                                            name="image"
                                            id="image"
                                            onChange={(e) => setImage(e.target.files[0])}
                                        />
                                    </FormGroup>
                                    <Button type="submit" color="primary" block>{isEdit ? 'Update' : 'Submit'}</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default PostForm;